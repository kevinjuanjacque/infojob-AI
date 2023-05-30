/* eslint-disable react-hooks/rules-of-hooks */

import { AnnotationIcon } from '@heroicons/react/outline'

import ErrorView from '@infojob/components/Error'
import LoadingView from '@infojob/components/LoadingView'
import { OfferLoading } from '@infojob/components/OfferLoading'

import Api from '@infojob/utils/Api'
import { Button, Callout } from '@tremor/react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const index = () => {
  const router = useRouter()
  const { id, title } = router.query
  const [Error, setError] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [LoadingFeed, setLoadingFeed] = useState(false)

  const [PlayVideo, setPlayVideo] = useState(false)
  const [EndVideo, setEndVideo] = useState(false)
  const [Capturing, setCapturing] = useState(false)

  const [Pregunta, setPregunta] = useState(
    'Hola, soy un entrevistador virtual creado por la IA para simular una entrevista laboral y evaluar respuestas. Estoy aquí para conocer más sobre ti en relación a una oferta laboral específica. Cuéntame sobre tu trayectoria profesional y cómo las habilidades y experiencias que has adquirido en el pasado se alinean con los requisitos y responsabilidades de este puesto en particular. Además, me gustaría saber cómo tu personalidad y estilo de trabajo se adaptan a la cultura y valores de nuestra empresa.',
  )
  const [Respuesta, setRespuesta] = useState('')
  const [Feed, setFeed] = useState('')
  const [UrlVideo, setUrlVideo] = useState(
    'https://files.movio.la/aws_pacific/avatar_tmp/ec04d27f76534e9d8d8e4fdd625f5b03/67af4a91-7a06-48ed-ba4c-04ad64780d0d.mp4?Expires=1686030074&Signature=jD5C2XxwhwSpf37X8qxh3tTE5Lf5LByGWrmAUS0oiukqDpgPsEo2rS0kTSRRfRcwhvHMAzYXrxtEHqjJKe1GmNySXaAPe5dxbnhIrtqcpwBma2-p2G7Y1dYisLCNeQoamer~mgHE5eYS1R52bQsLZYxWSr6brEcvHr3NqS8KBlD5QND25ibf8BuLqaES9N8QY-OW1aCsDIkP4P8rOrz7TTwhLHuw5T0gjbZMY93ddq375V3F1fHyygmEo1HWkh4NjYVEwD8bzVTJvLTE2a1p9KveUc-P8oRQwCiZ-i9DWkgJjRl1eoY6jeNdtneBPtuXlYTuQTb8vsW1v4lsuuT3RA__&Key-Pair-Id=K49TZTO9GZI6K',
  )

  const [recordedChunks, setRecordedChunks] = useState([])

  const mediaRecorderRef = useRef(null)
  const webcamRef = useRef(null)

  useEffect(() => {
    if (!getCookie('refresh_token')) {
      router.push('/')
    }
  }, [])

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm; codecs=vp9',
    })
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    )
    mediaRecorderRef.current.start()
  }, [webcamRef, setCapturing, mediaRecorderRef])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [mediaRecorderRef, setCapturing])

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data))
      }
    },
    [setRecordedChunks],
  )

  const handleDownload = useCallback(async () => {
    try {
      setLoadingFeed(true)
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: 'video/webm',
        })

        const formData = new FormData()
        formData.append('file', blob, 'video.webm')

        const data = await Api.post('/api/speech-text', formData)

        setRespuesta(data.data.transcriptions.text)

        const feed = await Api.post('/api/result-entrevista', {
          pregunta: Pregunta,
          respuesta: data.data.transcriptions.text,
        })

        setFeed(feed.data.feed)
        setLoadingFeed(false)

        setRecordedChunks([])
      }
    } catch (error) {
      setError(true)
    }
  }, [recordedChunks, Pregunta])

  useEffect(() => {
    const getStatus = async (idVideo) => {
      try {
        if (!idVideo) return
        const interval = setInterval(async () => {
          const resp = await Api.get(`/api/video/status?id=${idVideo}`)
          const data = resp.data

          if (data.data.status !== 'processing') {
            setUrlVideo(data.data.video_url)
            clearInterval(interval)
            setLoading(false)
          }
        }, 3000)
      } catch (error) {
        setError(true)
      }
    }
    const getQuestion = async (id) => {
      try {
        if (!id) return
        const resp = await Api.post(`/api/entrevista`, { id })
        const data = resp.data
        getStatus(data.video)
        setPregunta(data.pregunta)
      } catch (error) {
        setError(true)
      }
    }
    // getQuestion(id)
    if (id) {
      //   getQuestion(id)
    }

    return () => {}
  }, [id])

  if (Error) {
    return <ErrorView />
  }

  if (Loading)
    return (
      <LoadingView text="Esto puede tomar un tiempo, aprox 10min ">
        <div>
          <OfferLoading title={title} />
        </div>
      </LoadingView>
    )
  return (
    <div className="  bg-fondo w-[80vh] h-full flex flex-col justify-center items-center">
      {/* reproducir un video desde una url */}
      <div className="w-[40rem] aspect-video rounded-md bg-primaryL5 mb-5">
        <div>
          <video
            id="video-interview"
            autoFocus
            className=" z-20 w-[40rem] aspect-vide rounded-md absolute transition-all"
            onEnded={(e) => {
              document
                .getElementById('video-interview')
                .classList.remove('w-[40rem]')
              document
                .getElementById('video-interview')
                .classList.add('w-[15rem]')
              setEndVideo(true)
              setPlayVideo(false)
            }}
          >
            <source src={UrlVideo} />
          </video>
        </div>
        <div className="w-[40rem] rounded-md h-full aspect-video bg-black flex-grow[auto] ">
          <div
            id="div-video"
            className=" absolute z-10 w-[40rem]  box-border blur-md transition-all"
          >
            <Webcam
              className="aspect-video "
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              audio={true}
              muted={true}
              width={1280}
              forceScreenshotSourceSize
              videoConstraints={{ height: '0px' }}
            />
          </div>
        </div>
      </div>
      {Pregunta && (
        <div className=" border-[1px] border-grayL3 p-2 m-2 bg-grayL5 whitespace-break-spaces rounded-md font-mono">{`Pregunta:

${Pregunta}`}</div>
      )}
      {!(recordedChunks.length > 0) && Feed === '' && EndVideo == false && (
        <Button
          color="orange"
          onClick={() => {
            //TODO: grabar audio y eliminar blur
            document.getElementById('video-interview').play()
            // document.getElementById('div-video').classList.add('blur-0')
            // handleStartCaptureClick()
            setPlayVideo(true)
          }}
          loading={PlayVideo}
          loadingText="Reproduciendo la pregunta"
        >
          Comenzar
        </Button>
      )}
      <div className="flex justify-center items-center mt-10">
        {Capturing ? (
          <Button
            color="orange"
            onClick={() => {
              //TODO: grabar audio y eliminar blur
              document.getElementById('div-video').classList.add('blur-md')
              document.getElementById('div-video').classList.remove('blur-0')
              handleStopCaptureClick()
            }}
          >
            Finalizar
          </Button>
        ) : (
          !(recordedChunks.length > 0) &&
          Feed === '' &&
          EndVideo == true && (
            <Button
              color="orange"
              onClick={() => {
                //TODO: grabar audio y eliminar blur
                document.getElementById('div-video').classList.remove('blur-md')
                document.getElementById('div-video').classList.add('blur-0')
                handleStartCaptureClick()
              }}
              loading={PlayVideo}
              loadingText="Reproduciendo la pregunta"
            >
              Responder
            </Button>
          )
        )}

        {recordedChunks.length > 0 && Feed == '' && (
          <Button
            loading={LoadingFeed}
            loadingText="IA Evaluando respuesta"
            color="orange"
            onClick={handleDownload}
          >
            Evaluar respuesta
          </Button>
        )}

        {Feed !== '' && (
          <Button
            color="orange"
            onClick={() => {
              router.replace(`/job/${id}`)
            }}
          >
            Volver a la oferta
          </Button>
        )}
      </div>
      <div className="px-5 pt-5">
        {Feed && (
          <Callout
            color="pink"
            icon={AnnotationIcon}
            title="Feedback AI sobre tu entrevista: Mejoras en el desempeño y comentarios informativos"
          >
            {Feed}
          </Callout>
        )}
      </div>
    </div>
  )
}

export default index
