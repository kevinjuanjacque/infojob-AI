import { createDescription } from '@infojob/functions/createDescription'
import getVideos from '@infojob/functions/getVideos'
import axios from 'axios'
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
    content: `Quiero que cuando te pase la descripción de un trabajo, respondas con una introduccion y una pregunta para simular la entrevista de un trabajo basado en la descripción de la oferta.
        el formato de respuesta texto plano, y la pregunta debe ser general, para que la respuesta del usuario sea un par de minutos.
        
        Lo maximo de caracteres para una breve introduccion es de 50, por eso se directo con la introduccion, como por ejemplo Hola, espero que te encuentres bien, esta entrevista esta realizada con la AI, con el fin de simular una entrevista real, no afecta en nada a la postulación, es una sola pregunta.
        Intenta que la pregunta sea general, para que la respuesta del usuario sea un par de minutos Por ejemplo:
        
        "buen dia, esperando que te encunetres bien, esta encuesta fue realizada con la AI, con el fin de simular una entrevista real, no afecta en nada a la postulación, es una ronda con 3 preguntas. ¿Cual es tu experiencia con React?, y ¿cual a sido el mayor desafio que te a tocado enfrentar en dicho framework?"
         `,
  },
]

export default async function handler(req, res) {
  try {
    const { id } = req.body
    const offertData = await axios.get(
      `https://api.infojobs.net/api/7/offer/${id}`,
      {
        headers: {
          Authorization: `Basic ${process.env.TOKEN_BASIC}`,
        },
      },
    )

    const details = offertData.data
    const descriptionOffer = createDescription(details)

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        ...INITIAL_MESSAGES,
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: descriptionOffer,
        },
      ],
    })

    try {
      const response = completion.data.choices[0].message?.content
      try {
        const video = await getVideos(response)

        res.json({ ...video, pregunta: response })
      } catch (error) {
        res.status(500).json({
          msg: 'no se pudo generar el video',
        })
      }
    } catch (error) {
      res.status(500).json({
        msg: 'no se pudo parsear el json response de la ia',
      })
    }
  } catch (error) {
    return res.status(400).json({ msg: 'Error', error })
  }
}
