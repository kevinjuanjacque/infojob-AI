import {
  BeakerIcon,
  UserAddIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import {
  CalendarIcon,
  LocationMarkerIcon,
  BriefcaseIcon,
  OfficeBuildingIcon,
  ClockIcon,
  UserGroupIcon,
  CashIcon,
  ClipboardListIcon,
  ExclamationIcon,
  MinusCircleIcon,
} from '@heroicons/react/solid'
import LoadingView from '@infojob/components/LoadingView'
import { Score } from '@infojob/components/Score'
import { getModalidad } from '@infojob/functions/modality'
import Api from '@infojob/utils/Api'
import { Badge, Button, Callout, Card, Divider, Icon } from '@tremor/react'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const arrayColor = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
const colorRandom = arrayColor[Math.floor(Math.random() * arrayColor.length)]

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (!getCookie('refresh_token')) {
      router.push('/')
    }
  }, [])

  const { id, q } = router.query

  const [Evaluation, setEvaluation] = useState({})

  const [LoadingEvaluation, setLoadingEvaluation] = useState(false)

  const onClickCaculateEvaluation = async () => {
    try {
      const data = await Api.post('api/offer/info', { id: offer.id })
      const { msg } = data.data
      const resp = await Api.post('/api/offer/evaluated', { msg })
      setLoadingEvaluation(false)

      setEvaluation(resp.data)
    } catch (error) {
      setLoadingEvaluation(false)

      setEvaluation({
        score: '-',
        msg: 'Ocurrio un error, al evaluar tu perfil para esta oferta',
      })
    }
  }

  useEffect(() => {
    const modalidad = getModalidad(q)
    setData((prev) => ({ ...prev, modalidad }))
  }, [q])

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) return
        const res = await Api.get(`/api/offer/description?id=${id}`)
        const newData = res.data
        const modalidad = getModalidad(q)

        setData({ ...newData.details, modalidad })
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getData()
    return () => {}
  }, [id, q])

  if (loading) return <LoadingView />

  return (
    <main className="bg-fondo min-h-full p-2 ">
      <div className=" rounded-md border-[2px] max-w-4xl border-grayL3 bg-grayL5 p-0 flex flex-row">
        <div class="relative rounded-sm border-[1px] border-grayL3  w-[20%] aspect-square hidden md:block">
          <Image
            src={
              data.profile?.logoUrl ??
              'https://components.infojobs.com/statics/images/pic-company-logo.png'
            }
            alt={data.profile.companyName}
            fill
            className=" aspect-square "
          />
        </div>
        <div className="flex justify-between w-full sm:w-[80%]  p-5">
          <section>
            <div className="flex">
              <div class=" mr-2 mb-2 aspect-square block md:hidden rounded-sm border-[1px] border-grayL3">
                <Image
                  src={
                    data.profile?.logoUrl ??
                    'https://components.infojobs.com/statics/images/pic-company-logo.png'
                  }
                  alt={data.profile.companyName}
                  width={200}
                  height={200}
                  className=" aspect-square"
                />
              </div>
              <div>
                <h1 className=" tex-black text-2xl font-thin ">{data.title}</h1>
                <h2 className="  tex-black text-lg font-thin ">
                  {data.profile.name}
                </h2>
              </div>
            </div>
            <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 font-thin">
              <div className="flex justify-start items-center">
                <Icon icon={CalendarIcon} size="sm" color="indigo" />
                <p className="tex-blackite text-sm">
                  Publicada hace{' '}
                  {Math.floor(
                    (new Date() - new Date(data.creationDate)) /
                      (1000 * 60 * 60 * 24),
                  )}
                  D
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={LocationMarkerIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">
                  {data.city}, {data.country.value}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={BriefcaseIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">
                  Experiencia: {data.experienceMin.value}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={OfficeBuildingIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">
                  {data.modalidad?.value ?? ''}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={ClockIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">
                  Jornada: {data.journey.value}
                </p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={UserGroupIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">Vacantes: {data.vacancies}</p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={CashIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">{data.salaryDescription}</p>
              </div>
              <div className="flex justify-start items-center">
                <Icon icon={ClipboardListIcon} size="sm" color="indigo" />
                <p className="text-black text-sm">{data.contractType.value}</p>
              </div>
            </section>
          </section>
        </div>
      </div>

      <Divider />
      <Card decoration="top">
        <Callout
          title="Requisitos Minimos"
          className="whitespace-break-spaces"
          icon={ExclamationIcon}
          color="yellow"
        >
          {data.minRequirements || 'No se especifican los requisitos minimos'}

          <h6 className="text-md my-2 font-semibold">
            Conocimientos requeridos
          </h6>
          {data.skillsList.length > 0 ? (
            data.skillsList.map((skill, index) => (
              <Badge color="rose" key={index}>
                {skill.skill}
              </Badge>
            ))
          ) : (
            <p>No se especifican los conocimientos requeridos</p>
          )}
        </Callout>

        <section className="p-5">
          <h1 className="text-2xl font-thin my-5">Descripción</h1>
          <div className="flex flex-col gap-1 sm:flex-row mb-5">
            <Badge icon={MinusCircleIcon} color="sky">
              {data.category.value}
            </Badge>
            <Badge icon={MinusCircleIcon} color="sky">
              {data.subcategory.value}
            </Badge>
          </div>
          <p className="text-md font-thin whitespace-break-spaces">
            {data.description}
          </p>
        </section>

        {Evaluation.score && <Score Evaluation={Evaluation} />}
        <section className="flex gap-1">
          <Button
            icon={UserAddIcon}
            color="orange"
            onClick={() => {
              //TODO: go to new tab
              window.open(
                `https://www.infojobs.net/candidate/application/index.xhtml?id_oferta=${data.id}`,
                '_blank',
              )
            }}
          >
            {' '}
            Postular{' '}
          </Button>
          {!Evaluation.msg && (
            <Button
              icon={BeakerIcon}
              loading={LoadingEvaluation}
              loadingText="La IA haciendo magia"
              color="orange"
              onClick={(e) => {
                setLoadingEvaluation(true)
                onClickCaculateEvaluation(data.id)
              }}
            >
              {' '}
              IA Evaluarme{' '}
            </Button>
          )}
          <Button
            icon={VideoCameraIcon}
            color="orange"
            onClick={() => {
              router.push(`/interview?id=${data.id}&title=${data.title}`)
            }}
          >
            {' '}
            Intentar entrevista con IA{' '}
          </Button>
        </section>
        <div className="w-full h-[0.1px] bg-gray my-2"></div>
        <section className="pb-2">
          <p className="text-sm font-thin text-gray my-2">
            Con el fin de probar la funcionalidad de la entrevista con la IA de
            manera más eficiente, se ha desarrollado esta función que simula el
            servicio evitando así la espera, Esto debido a que el servicio
            externo demora aproximadamente 10 minutos en resolver.
          </p>
          <Button
            icon={VideoCameraIcon}
            color="orange"
            onClick={() => {
              router.push(`/interview/test?id=${data.id}&title=${data.title}`)
            }}
          >
            {' '}
            Test entrevista con IA{' '}
          </Button>
        </section>
      </Card>
    </main>
  )
}
