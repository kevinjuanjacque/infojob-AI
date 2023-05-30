import { useRouter } from 'next/router'
import { LogoM } from './assets/svgs/logo-m'
import { IconInfoJob2 } from './assets/svgs/iconInfoJob2'
import { SearchCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export const NavBar = () => {
  const [Search, setSearch] = useState('')
  const router = useRouter()
  return (
    <div className=" shadow-sm w-full pb-2">
      <div className=" shadow-md flex  items-center">
        <div className="p-5 w-24 h-24">
          <IconInfoJob2
            className="cursor-pointer"
            onClick={() => {
              const path = router.pathname
              if (path !== '/') {
                router.push('/home')
              }
            }}
          />
        </div>
        <div className="border-[1px] bg-grayL3 border-grayL2 font-thin  rounded-md flex items-center">
          <input
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            className="w-full sm:w-56 px-2 h-10 font-thin  bg-transparent"
            placeholder="Buscar trabajo "
          />
          <div className="h-5 w-[1px] bg-grayL2"> </div>

          <button
            onClick={() => {
              if (Search) {
                router.push(`/search/${Search}`)
              }
            }}
            className=" bg-transparent px-2"
          >
            <SearchIcon className="text-primary" width={25} color="" />
          </button>
        </div>
      </div>
    </div>
  )
}
