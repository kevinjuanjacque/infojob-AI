import { CardOffer } from '@infojob/components/CardOffer'
import LoadingView from '@infojob/components/LoadingView'
import Api from '@infojob/utils/Api'
import { Button } from '@tremor/react'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

const Search = () => {
  const router = useRouter()
  const { search, q } = router.query

  const [Page, setPage] = useState(1)
  const [Loading, setLoading] = useState(true)
  const [Offers, setOffers] = useState([])
  const [Total, setTotal] = useState(0)

  useEffect(() => {
    const getOffers = async () => {
      const resp = await Api.post('/api/offer/similar', {
        puesto: search,
        maxResults: 10,
        page: Page,
      })
      setOffers(resp.data.offers)
      console.log(resp.data)
      setTotal(resp.data.totalPages)
      setLoading(false)
    }
    if (search) {
      getOffers()
    }
  }, [Page, search])

  return (
    <>
      <div className="text-2xl text-grayD4 p-2">
        Resultado de busqueda para:{' '}
        <strong className="text-black">{search}</strong>
      </div>
      <div className="w-full h-[0.5px] bg-gray my-5 px-2"></div>
      {Loading ? (
        <LoadingView text="Cargando busqueda..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2">
          {Offers.map((offer, index) => (
            <Fragment key={index}>
              <CardOffer offer={offer} />
            </Fragment>
          ))}
        </div>
      )}
      <div className="flex justify-center gap-2 py-5">
        <Button
          disabled={Page <= 1}
          onClick={() => {
            if (Page > 1) {
              setPage(Page - 1)
            }
          }}
        >
          {'<'}
        </Button>
        {Array.from({ length: Total > 5 ? 5 : Total }, (_, i) => i + Page).map(
          (item, index) => (
            <Button
              disabled={Page === item}
              onClick={() => {
                setPage(item)
              }}
              key={index}
            >
              {item}
            </Button>
          ),
        )}
        <Button
          disabled={Page >= Total}
          onClick={() => {
            if (Page < Total) {
              setPage(Page + 1)
            }
          }}
        >
          {'>'}
        </Button>
      </div>
    </>
  )
}

export default Search
