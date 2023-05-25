/* eslint-disable react-hooks/rules-of-hooks */

import { AnnotationIcon } from "@heroicons/react/outline";


import ErrorView from "@infojob/components/Error";
import LoadingView from "@infojob/components/LoadingView";

import Api from "@infojob/utils/Api"
import { Button, Callout, Card } from "@tremor/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import Webcam from "react-webcam";







const index = () => {

    const router  = useRouter()
    const { id } = router.query
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(true)

    const [PlayVideo, setPlayVideo] = useState(true)
    const [Capturing, setCapturing] = useState(false)


    const  [Pregunta, setPregunta] = useState("")
    const  [Respuesta, setRespuesta] = useState("")
    const  [Feed, setFeed] = useState("")
    const  [UrlVideo, setUrlVideo] = useState()

    const [recordedChunks, setRecordedChunks] = useState([]);

   
  

  


    

    const mediaRecorderRef = useRef(null);
    const webcamRef = useRef(null);


    useEffect(() => {
      if(!getCookie('refresh_token')) {
        router.push('/')
      }
    },[])

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm; codecs=vp9"
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
      }, [webcamRef, setCapturing, mediaRecorderRef]);

      const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
      }, [mediaRecorderRef, setCapturing]);
    

      const handleDataAvailable = useCallback(
        ({ data }) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
      );

      const handleDownload = useCallback(async() => {
       try {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/webm"
          });
          
          const formData = new FormData();
          formData.append('file', blob, 'video.webm');
          
          const data = await Api.post('/api/speech-text', formData);

          console.log(data.data)
          setRespuesta(data.data.transcriptions.text)

          console.log({Pregunta, respuesta:data.data.transcriptions.text})
          const feed = await Api.post('/api/result-entrevista',{
            pregunta: Pregunta,
            respuesta: data.data.transcriptions.text
          })

          console.log(feed.data)
          setFeed(feed.data.feed)

          setRecordedChunks([]);
        }
       } catch (error) {
        setError(true)
        console.log(error)
       }
      }, [recordedChunks,Pregunta]);
    

    useEffect(() => {
        const getStatus = async (idVideo)=>{
            try {
                if(!idVideo) return;
                const interval = setInterval(async () => {
                    const resp = await Api.get(`/api/video/status?id=${idVideo}`);
                    const data = resp.data;
                    console.log(data)

                    if(data.data.status !== 'processing'){
                        setUrlVideo(data.data.video_url)
                        clearInterval(interval)
                        setLoading(false)
                    }
                }, 3000);
            } catch (error) {
        setError(true)

                console.log(error)
            }
        }
        const getQuestion = async (id) => {
            try {

                if(!id) return;
                const resp = await Api.post(`/api/entrevista`, { id });
                const data = resp.data;
                getStatus(data.video)
                setPregunta(data.pregunta)
                
            } catch (error) {
        setError(true)

                console.log(error)
            }
        }
        // getQuestion(id)
        if(id) {
          console.log(id)
          getQuestion(id);
        }
    
      return () => {
        
      }
    }, [id])

    if(Error) {
      
      return <ErrorView/>
    };

    if(Loading) return <LoadingView text="Esto puede tomar un tiempo" >

    </LoadingView>;
  return (
    <div className="  bg-fondo w-[80vh] h-full flex flex-col justify-center items-center">
        {/* reproducir un video desde una url */}
        <div className="w-[40rem] aspect-video rounded-md bg-primaryL5 relative">

            <div>
            <video id="video-interview" autoFocus autoPlay className=" z-20 w-[40rem] aspect-vide rounded-md absolute transition-all" onEnded={(e)=>{
                document.getElementById('video-interview').classList.remove("w-[40rem]");
                document.getElementById('video-interview').classList.add("w-[15rem]");
                setPlayVideo(false)
                console.log('pass')
            }}>
                <source src={UrlVideo}/>
            
            </video>
            </div>
            <div className="w-[40rem] rounded-md h-full aspect-video bg-black flex-grow[auto] ">
                <div id="div-video" className=" absolute z-10 box-border blur-md transition-all">
                <Webcam  className="aspect-video " height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    audio={true}
                    muted={true}
                    width={1280} forceScreenshotSourceSize  videoConstraints={{height:"0px"}}  
                     />
                </div>
            </div>
            
        </div>
                {
                  Pregunta && (
                    <div className=" border-[1px] border-grayL3 p-2 m-2 bg-grayL5">{`
                      Pregunta:

                      ${Pregunta}
                    `}</div>
                  )
                }
        <div className="flex justify-center items-center mt-10">


                {Capturing ? <Button color="orange" onClick={()=>{
                    //TODO: grabar audio y eliminar blur
                    document.getElementById('div-video').classList.add("blur-md")
                    document.getElementById('div-video').classList.remove("blur-0")
                    handleStopCaptureClick()
                }}   >
                    Finalizar
                </Button>:
                (!(recordedChunks.length > 0 ) && (Feed==="")) && <Button color="orange" onClick={()=>{
                    //TODO: grabar audio y eliminar blur
                    document.getElementById('div-video').classList.remove("blur-md")
                    document.getElementById('div-video').classList.add("blur-0")
                    handleStartCaptureClick()
                    

                }}  loading={PlayVideo} loadingText="Reproduciendo la pregunta" >
                    Responder
                </Button>}

                {recordedChunks.length > 0 && Feed=="" && (
                    <Button color="orange" onClick={handleDownload}>Revizar</Button>
                )}

                {Feed!=="" && (
                  <Button color="orange" onClick={()=>{
                    router.push(`job/${id}`)
                  }} >
                      Volver a la oferta
                  </Button>
                )}
            </div>
            <div className="px-5 pt-5">
            {Feed && <Callout color="pink" icon={AnnotationIcon} title="Feedback AI sobre tu entrevista: Mejoras en el desempeño y comentarios informativos">
              {Feed}
            </Callout>}
            </div>
    </div>
  )
}

export default index