/* eslint-disable react-hooks/rules-of-hooks */
import { FireIcon } from '@heroicons/react/outline'
import { CardOffer } from '@infojob/components/CardOffer'
import ErrorView from '@infojob/components/Error'
import LoadingView from '@infojob/components/LoadingView'
import Api from '@infojob/utils/Api'
import { Button, Icon, Text } from '@tremor/react'
import { Flex } from '@tremor/react'
import { Card } from '@tremor/react'
import { Metric } from '@tremor/react'
import { ProgressBar } from '@tremor/react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function index() {
  const router = useRouter()
  const [JobsActive, setJobsActive] = useState(0)
  const [UserInfo, setUserInfo] = useState({})
  const [Error, setError] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Api.get('/api/user')
        const data = response

        setUserInfo(data.data)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    if (!getCookie('refresh_token')) {
      router.push('/')
    } else {
      getData()
    }
  }, [])

  const getJobs = async () => {
    const resp = await Api.post('/api/offer/similar', {
      puesto: JobsActive,
      maxResults: 10,
      page: 1,
    })
    setUserInfo((prev) => ({ ...prev, offer: resp.data.offers }))
  }

  if (Error) return <ErrorView />

  if (!UserInfo.name) {
    return <LoadingView />
  }

  return (
    <>
      <div className="h-min-full bg-[#EDF1F7] text-primaryD4 p-2">
        <h1 className="text-3xl ">
          Bienvenido <strong>{UserInfo.name.toUpperCase()}</strong>,{' '}
        </h1>
        <h1 className="text-2xl text-gray ">Ofertas que pueden interesarte</h1>

        <div className="w-full h-[px] bg-grayL2"></div>

        <div className="flex gap-5 p-2 pt-5">
          {UserInfo.jobs.map((job, index) => (
            <div
              key={index}
              onClick={() => {
                if (job != JobsActive) {
                  setJobsActive(job)
                  getJobs()
                }
              }}
              className={
                job != JobsActive
                  ? 'bg-grayL5 text-primary2 border-[1px] rounded-full p-2 cursor-pointer'
                  : 'bg-primary2 text-grayL5 border-[1px] rounded-full p-2 cursor-pointer'
              }
            >
              {job}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {UserInfo.offer.map((offer, index) => (
            <React.Fragment key={index}>
              <CardOffer offer={offer} />
            </React.Fragment>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          //window alert con input para poner el puesto
          const resp = window.prompt(
            'Ingresa el puesto de trabajo que te gustaria ver en ofertas de tinder jobs',
          )
          console.log(resp)
          router.push(`/tinderJob?puesto=${resp}`)
        }}
        id="button-float"
        color="red"
        tooltip="Ofertas que pueden interesarte"
        className="fixed bottom-10 right-10 float-right ml-2 bg-error1 hover:bg-errorD2 text-white text-sm font-bold rounded-full px-1 py-1"
      >
        <Icon icon={FireIcon} size="lg" color="white" />
      </Button>
    </>
  )
}
