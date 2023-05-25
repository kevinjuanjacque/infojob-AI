
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai"



const configuration = new Configuration({
    apiKey: process.env.TOKEN_OPENIA
})

const openai = new OpenAIApi(configuration)



export default async function handle(req,res){
    try {
    
    const {pregunta,respuesta} = req.body;


    if(!pregunta || !respuesta){
        return res.status(400).json({message:'Missing data'})
    }

    const completion = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:[

            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `En base a la pregunta que se describe a continuación, "${pregunta}", dame feedback de la respuesta que se transcribio de esta manera: "${respuesta}".
                 Responde con respecto a los conocimientos del tema que se pregunta, que tan fluida es su respuesta, y si encuentras incosistencias en la respuesta mencionalo, ten en cuenta tambien la formalidad con la que se respondio, podrias aportar diversos consejos para mejorar, como por ejemplo: podrias haber hablado de tu experiencia en x puesto debido a que tiene relacion con la tecnologia de la pregunta`
            }
        ]
    })


    const response = completion.data.choices[0].message?.content;


    res.json({feed:response})
} catch (error) {
    console.log(error?.response?.data)
    console.log(error)
    res.status(500).json({message:'Error',error})
}




}