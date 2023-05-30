import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai'

const configuration = new Configuration({
  apiKey: process.env.TOKEN_OPENIA,
})

const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `Quiero que cuando te pase la descripción de un trabajo, mas el información del usuario, le des una nota del 1 al 10, segun lo que el perfil del usuario se adapte a la descripción de la oferta.

        el formato de respuesta JSON sin texto, asi como el siguiente ejemplo:
        
        {
           "score": [score],
           "msg": [msg]
        }
        
        tienes que cambiar lo que hay entre corchetes por el valor, lo maximo de caracteres para el msg es de 50, por eso se directo con el motivo de por que se adapta y no al perfil del usuario, como por ejemplo años de experiencia faltantes, o falta de skills. Por ejemplo:
        
        {
           "score":7,
          "msg":"en la oferta de trabajo se menciona las skill sobre la herramienta de react, que no posee tu informacion personal, pero si contienes las skill sobre bases de datos y diferentes herramientas de frontend"
        }`,
  },
]

export default async function Evaluated(req, res) {
  try {
    const { msg } = req.body

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        ...INITIAL_MESSAGES,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: msg,
        },
      ],
    })

    try {
      const response = JSON.parse(completion.data.choices[0].message?.content)
      res.json(response)
    } catch (error) {
      res.status(500).json({
        msg: 'no se pudo parsear el json response de la ia',
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
}
