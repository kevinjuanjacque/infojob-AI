import { Badge, Button, CategoryBar, Icon } from '@tremor/react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Score } from './Score'
import {
  BeakerIcon,
  BriefcaseIcon,
  CashIcon,
  ClockIcon,
  LocationMarkerIcon,
  MinusCircleIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { getModalidadId } from '@infojob/functions/modality'
import Api from '@infojob/utils/Api'

export const CardOffer = ({ offer }) => {
  const offer2 = {
    id: '018ab86e124c48abfcb771e2902bb6',
    title: 'AGENTE COMERCIAL INMOBILIARIO',
    province: {
      id: 51,
      value: 'Vizcaya/Bizkaia',
    },
    city: 'Sestao',
    link: 'https://www.infojobs.net/sestao/agente-comercial-inmobiliario/of-i018ab86e124c48abfcb771e2902bb6',
    category: {
      id: 190,
      value: 'Comercial y ventas',
    },
    contractType: {
      id: 10,
      value: 'Autónomo',
    },
    subcategory: {
      id: 3131,
      value: 'Agente comercial',
    },
    salaryMin: {
      id: 270,
      value: '24.000 €',
    },
    salaryMax: {
      id: 650,
      value: '100.000 €',
    },
    salaryPeriod: {
      id: 3,
      value: 'Bruto/año',
    },
    experienceMin: {
      id: 1,
      value: 'No Requerida',
    },
    workDay: {
      id: 9,
      value: 'Intensiva - Indiferente',
    },
    study: {
      id: 50,
      value: 'Bachillerato',
    },
    teleworking: {
      id: 2,
      value: 'Solo teletrabajo',
    },
    published: '2023-05-23T20:27:32.000Z',
    updated: '2023-05-23T20:27:32.000Z',
    author: {
      id: '10211452505157545251501017174246614841',
      privateId: 32317449692,
      name: 'SAFTI',
      uri: 'https://safti.ofertas-trabajo.infojobs.net',
      logoUrl:
        'https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/14/14502ba3-3930-4b86-a661-98aa67f8ee53?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1MjUwOTQ4MjgsInJxcyI6IkdFVFxcL3RlbmFudHMvYzdlMmI5YzEtODQ4MC00M2IwLWFkOWUtMDAwYzE3YWEyY2JiL2RvbWFpbnMvNzE4MzAyYjYtNTM0My00M2QzLWE4YTMtODI5ZGMzZGEwODkzL2J1Y2tldHMvNmYzYWIxY2MtNTkyMC00ZjRlLWIxMzEtNDZhNDU4N2EwZTFmL2ltYWdlcy8xNC8xNDUwMmJhMy0zOTMwLTRiODYtYTY2MS05OGFhNjdmOGVlNTMiLCJtZXRhZGF0YSI6eyJydWxlIjp7InZlcnNpb24iOiIyMDE2LTEwIiwiYWN0aW9ucyI6W119fX0.V_JRuClO3bQw-d54XJnqjMIEe85FpxHeSKm_LZ1KECHVDzFBpMFdc-DyP-UUEVozJGQFaJPRNoTmOVT_IzCju51fspDXHgSfmqYsQbWoC6yuJpSseNcF5sunXi16qeB9W_fxdWMe58A23R2auQwhz7-mOFjrjyO1pvK-6e4BTotkZzrly6lLA7RWodBc4zrME8Ie6hSnLsfaGacsqWYjrnXX-x_3h39su7r5aNJvgBGvpAU7PSDVwDqXPapyi-1uauu2xKwr1l7af-qAvqris8JFOlfaRhXcGz41pzQjxuYb2vy1MzLfy6rkGwWY1kLjxdU1xPt_MPF7My4tvrCEvA&AccessKeyId=d724d9a53d95a810',
      corporateResponsive: false,
      showCorporativeHeader: false,
    },
    requirementMin: `1. Excelentes habilidades de comunicación. 
2. Ética y profesionalismo. 
3. Capacidad para resolver problemas y tomar decisiones. 
4. Habilidad comercial para negociar y cerrar ventas. 
5. Excelente habilidad de servicio al cliente. 
6. Competencia en el uso de herramientas tecnológicas`,
    bold: false,
    applications: '0',
    subSegment: 23,
    executive: false,
    salaryDescription: '24.000€ - 100.000€ Bruto/año',
    multiProvince: false,
    urgent: false,
    color: false,
  }
  const router = useRouter()

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

  return (
    <main className="  max-h-full  transition-all ">
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          router.push(
            `/job/${offer.id}?q=${getModalidadId(offer.teleworking.id)}`,
          )
        }}
        className="flex cursor-pointer max-h-full transition-all duration-700 bg-grayL4 border-[1px] border-grayL3 flex-col justify-between rounded-md hover:shadow-lg p-2 "
      >
        <section className="flex  items-start">
          <div className="flex  items-center gap-2 flex-[3]">
            <img
              className="w-20 h-20 rounded-full border-2 border-grayL3"
              src={
                offer.author.logoUrl ??
                'https://components.infojobs.com/statics/images/pic-company-logo.png'
              }
              alt="logo"
            ></img>
            <div>
              <h1 className="text-sm font-semibold text-[#0A26EE]">
                {offer.title}
              </h1>
              <span className="text-xs font-thin">
                {' '}
                <Link
                  className="border-b-[0.5px] font-bold border-b-grayL1"
                  href={offer.author.uri}
                  target="_blank"
                >
                  {offer.author.name}
                </Link>{' '}
                {/* | {offer.province.value}, {offer.city} | {offer.contractType.value} |{' '}
              {offer.workDay.value} | {offer.teleworking.value}{' '} */}
              </span>
            </div>
          </div>
          <div className="h-full w-[1px] bg-grayL3"></div>
          <div className=" flex flex-col justify-between ml-2 flex-[2] overflow-hidden">
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={LocationMarkerIcon} size="xs" />
              <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap   text-right  ">
                {offer.province.value}, {offer.city}
              </p>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={BriefcaseIcon} size="xs" />
              <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap   text-right  ">
                {offer.contractType.value}
              </p>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={ClockIcon} size="xs" />
              <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap   text-right  ">
                {offer.workDay.value}
              </p>
            </div>
            <div className="flex  justify-start items-center text-ellipsis whitespace-nowrap w-full">
              <Icon icon={OfficeBuildingIcon} size="xs" />
              <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap   text-right  ">
                {offer.teleworking?.value || 'Sin especificar '}{' '}
              </p>
            </div>
            <p className="w-full mt-2 text-right text-sm  ">
              <CashIcon
                className="inline-block mr-1"
                width={15}
                color="#0A26EE"
              />
              {!offer.salaryMin.value
                ? 'No se indica salario'
                : `Salario: ${offer.salaryMin.value} - ${offer.salaryMax.value}`}
            </p>
          </div>
        </section>
        {/* separador divider */}
        <div className="w-full h-[1px] bg-grayL3 my-2"></div>
        <section>
          <div className=" transition-all ">
            {Evaluation.score && <Score Evaluation={Evaluation} />}
            {!Evaluation.msg && (
              <section className="w-full flex justify-end">
                <Button
                  icon={BeakerIcon}
                  loading={LoadingEvaluation}
                  className=" rounded-full "
                  loadingText="La IA haciendo magia"
                  color="orange"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLoadingEvaluation(true)
                    onClickCaculateEvaluation()
                  }}
                >
                  {' '}
                  IA Evaluarme{' '}
                </Button>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
