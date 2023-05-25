import { NavBar } from '@infojob/components/NavBar'
import '@infojob/styles/globals.css'
import 'regenerator-runtime/runtime'

export default function App({ Component, pageProps }) {
  return <div className='h-screen'> 
      <NavBar />
      <div className=' flex justify-center items-center'>
      <div className='max-w-4xl'>
        <Component {...pageProps} />
        </div>

      </div>
  </div>
}
