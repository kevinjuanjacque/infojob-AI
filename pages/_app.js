import { NavBar } from '@infojob/components/NavBar'
import '@infojob/styles/globals.css'
import 'regenerator-runtime/runtime'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className=" flex flex-1 justify-center items-center">
        <div className="max-w-4xl h-full">
          <Component {...pageProps} />
          <Analytics />
        </div>
      </div>
    </div>
  )
}
