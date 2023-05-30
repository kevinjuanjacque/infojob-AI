/* eslint-disable react-hooks/rules-of-hooks */
import {
  AcademicCapIcon,
  CurrencyEuroIcon,
  ExclamationIcon,
  HeartIcon,
  IdentificationIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
  StatusOfflineIcon,
  XIcon,
} from '@heroicons/react/outline'
import LoadingView from '@infojob/components/LoadingView'
import Api from '@infojob/utils/Api'
import { Button, Callout, Icon } from '@tremor/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const [state, setState] = useState(null)
  const [Jobs, setJobs] = useState([])
  const [Page, setPage] = useState(1)

  const router = useRouter()

  const { puesto } = router.query

  useEffect(() => {
    const getJobs = async () => {
      const resp = await Api.post('/api/offer/tinderjobs', {
        puesto: puesto,
        maxResults: 10,
        page: Page,
      })

      setJobs(resp.data.offers)
    }
    if (puesto) {
      getJobs()
    }
  }, [Page, puesto])

  const lengthJobs = Jobs.length

  const handleAplication = async (id) => {
    try {
      setJobs(Jobs.filter((job) => job.id !== id))
      const resp = await Api.post('/api/offer/application', {
        offerId: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRejectOffer = async (id) => {
    setJobs(Jobs.filter((job) => job.id !== id))
  }

  useEffect(() => {
    if (lengthJobs == 1) {
      setPage((prev) => prev + 1)
    }
  }, [lengthJobs])

  const constraintsRef = useRef(null)

  if (Jobs.length == 0) return <LoadingView text="Cargando trabajos" />

  return (
    <div
      className=" h-full flex flex-col justify-center items-center"
      ref={constraintsRef}
    >
      <motion.div
        className="w-full px-4 md:px-0"
        dragElastic={0.5}
        drag="x"
        dragConstraints={constraintsRef}
        onDrag={(event, info) => {
          const percentage = info.point.x / window.innerWidth
          if (percentage >= 0.8) {
            if (state !== 'like') {
              setState('like')
            }
          } else if (percentage <= 0.2) {
            if (state !== 'dislike') {
              setState('dislike')
            }
          } else {
            if (state !== 'neutral') {
              setState('neutral')
            }
          }
        }}
        onDragEnd={(event, info) => {
          if (state === 'like') {
            handleAplication(Jobs[0].id)
          } else if (state === 'dislike') {
            handleRejectOffer(Jobs[0].id)
          }
          setState(null)
        }}
      >
        <div className="flex shadow-lg flex-col max-w-96 px-1 md:px-0 min-h-96 items-center bg-primaryL3 rounded-md cursor-grab ">
          <div className="p-5 ">
            <Image
              alt="image"
              className="rounded-md"
              src={
                Jobs[0].author?.logoUrl ??
                'https://components.infojobs.com/statics/images/pic-company-logo.png'
              }
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col px-5 py-5 justify-center">
            <h1 className="text-2xl font-bold text-center">{Jobs[0].title}</h1>

            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={IdentificationIcon} size="md" color="black" />
              <h3 className="text-md">{Jobs[0].author?.name}</h3>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={LocationMarkerIcon} size="md" color="black" />
              <h3 className="text-md">{Jobs[0].city}</h3>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={AcademicCapIcon} size="md" color="black" />
              <h3 className="text-md">{Jobs[0].experienceMin.value}</h3>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={CurrencyEuroIcon} size="md" color="black" />
              <h3 className="text-md">{Jobs[0].salaryDescription}</h3>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={OfficeBuildingIcon} size="md" color="black" />
              <h3 className="text-md">
                {Jobs[0].teleworking?.value || 'Sin especificar'}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
      <section className="w-full my-5 flex justify-between">
        <Icon
          size="lg"
          className=" bg-white shadow-md rounded-full"
          color="black"
          icon={XIcon}
          onClick={() => handleRejectOffer(Jobs[0].id)}
        />
        <Icon
          size="lg"
          className="bg-white shadow-md rounded-full"
          color="red"
          onClick={() => handleAplication(Jobs[0].id)}
          icon={HeartIcon}
        />
      </section>
      <div className="px-5">
        <Callout color="rose" icon={ExclamationIcon} title="Advertencia">
          <p className="text-sm">
            Este aplicación está realmente conectada con el servicio de Infojob,
            por favor tenlo en cuenta al momento de dar like o deslizar hacia la
            derecha, ya que se realizará una postulación directa de tu perfil en
            Infojob.
          </p>
        </Callout>
      </div>
    </div>
  )
}
