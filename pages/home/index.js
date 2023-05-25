import { CardOffer } from "@infojob/components/CardOffer"
import ErrorView from "@infojob/components/Error"
import LoadingView from "@infojob/components/LoadingView"
import Api from "@infojob/utils/Api"
import { Text } from "@tremor/react"
import { Flex } from "@tremor/react"
import { Card } from "@tremor/react"
import { Metric } from "@tremor/react"
import { ProgressBar } from "@tremor/react"
import axios from "axios"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"


export default function index  ()  {
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
            setError(true)
            console.log(error)
        }
      }
      if(!getCookie('refresh_token')) {
        router.push('/')
      }else{

          getData();
      }
    }, [])

    if(Error) return <ErrorView />;

    if(!UserInfo.name){
        return <LoadingView/>;
    }
  return (
    <div className="h-min-full bg-[#EDF1F7] text-primaryD4 p-2">
        <h1 className="text-3xl ">Bienvenido <strong>{UserInfo.name.toUpperCase()}</strong>, </h1>
        <h1 className="text-2xl text-gray ">Ofertas que pueden interesarte</h1>

        <div className="w-full h-[px] bg-grayL2"></div>

        <div className="flex gap-5 p-2 pt-5">
        {
            UserInfo.jobs.map((job, index) => (
                    <div  key={index} className={ index!=JobsActive ? "bg-grayL5 text-primary2 border-[1px] rounded-full p-2" : "bg-primary2 text-grayL5 border-[1px] rounded-full p-2"}>
                        {job}
                    </div>
            ))
        }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
        {
            UserInfo.offer.map((offer, index) => (
                <React.Fragment key={index}>
                        <CardOffer offer={offer} />
                </React.Fragment>
            ))
        }
        </div>

    </div>
  )
}
