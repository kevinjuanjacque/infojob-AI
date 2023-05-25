import { Button } from "@tremor/react"
import ErrorSVG from "./assets/svgs/error"
import { ArrowLeftIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"




const ErrorView = ({title="Ocurrio un error inesperado", action=null}) => {
    const router = useRouter()
    
  return (
    <div className="h-full w-full">
        <div className=" w-full h-full flex flex-col justify-center items-center">
        <ErrorSVG className="w-full h-full" />
            <h1 className="text-2xl font-bold text-black">{title}</h1>
            <Button color="red" icon={ArrowLeftIcon} className=" text-white px-4 py-2 rounded-md" onClick={()=>{
                router.back()
            }}>Volver</Button>
            </div>

    </div>
  )
}

export default ErrorView