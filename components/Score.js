import { MinusCircleIcon } from "@heroicons/react/outline"
import { Badge, Callout, CategoryBar, Divider } from "@tremor/react"


export const Score = ({Evaluation}) => {
  return (
    <>

                <div className="flex justify-between">
                    <p className="text-sm font-extralight ">Tu perfil se adapta a esta oferta en un:</p>
                    <p className="text-sm font-semibold">{Evaluation.score*10}%</p>
                </div>
                <CategoryBar
                    categoryPercentageValues={[10, 20, 30, 40]}
                    colors={["rose", "orange", "yellow", "emerald"]}
                    percentageValue={10*Evaluation.score}
                    className="p-3"
                />
                <Callout 
                    className="p-2 mb-4"
                    color={Evaluation.score < 3 ? "rose" : Evaluation.score < 6 ? "yellow" : "emerald"}
                >
                    {Evaluation.msg}
                    <Divider />

                    <Callout className="mt-2" title="Advertencia"  color="red" icon={MinusCircleIcon}>La evaluación fue realizada por el sistema de Inteligencia Artificial (IA). No afecta tu posibilidad de postulación ni es una representación real, ya que se basa en la información proporcionada en la plataforma.</Callout> 

                </Callout>
            </>
  )
}
