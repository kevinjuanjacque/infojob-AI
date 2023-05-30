import { RefreshIcon } from '@heroicons/react/outline'
import { getModalidadId } from '@infojob/functions/modality'
import Api from '@infojob/utils/Api'
import { Button } from '@tremor/react'
import Image from 'next/image'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'

export const OfferLoading = ({ title }) => {
  const [offer, setOffer] = useState([])
  const [Page, setPage] = useState(1)
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const getOffer = async () => {
      const res = await Api.post('/api/offer/similar', {
        puesto: title,
        maxResults: 2,
        page: Page,
      })
      setLoading(false)
      setOffer(res.data.offers)
    }
    if (title) {
      getOffer()
    }
  }, [Page, title])

  return (
    <div className="flex flex-col gap-2 pt-2  px-2 md:px-0">
      <h1 className=" text-lg text-gray text-center mb-2">
        Puedes revisar alguna de las ofertas similares
      </h1>
      {offer.map((item) => (
        <Link
          href={`/job/${item.id}?q=${getModalidadId(
            item.teleworking?.id || 4,
          )}`}
          target="_blank"
          key={item.id}
          className="bg-grayL5 p-5 rounded-md"
        >
          <section className="flex  items-center ">
            <div className="mr-2">
              <Image
                src={
                  item.author?.logoUrl ??
                  'https://components.infojobs.com/statics/images/pic-company-logo.png'
                }
                alt={item.author.name}
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col">
              <h1>{item.title}</h1>
              <article>
                <p className="text-xs font-thin">{item.author.name}</p>
                <p className="text-xs font-thin">{item.city}</p>
                <p className="text-xs font-thin">{item.salaryDescription}</p>
                <p className="text-xs font-thin">
                  {item.teleworking?.value || 'Sin especificar modalidad'}
                </p>
              </article>
            </div>
          </section>
        </Link>
      ))}
      <Button
        icon={RefreshIcon}
        onClick={() => {
          setPage(Page + 1)
          setLoading(true)
        }}
        loading={Loading}
        loadingText="Buscando..."
      >
        Otros resultados
      </Button>
    </div>
  )
}
