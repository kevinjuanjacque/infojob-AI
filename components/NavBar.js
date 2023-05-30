import { useRouter } from 'next/router'
import { LogoM } from './assets/svgs/logo-m'
import { IconInfoJob2 } from './assets/svgs/iconInfoJob2'
import { SearchCircleIcon, SearchIcon } from '@heroicons/react/outline'

export const NavBar = () => {
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
      </div>
    </div>
  )
}
