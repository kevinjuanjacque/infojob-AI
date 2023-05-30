import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { offerId } = req.body
    const { access_token } = req.headers

    console.log({ offerId, access_token, basic: process.env.TOKEN_BASIC })
    const offer = await axios.post(
      `https://api.infojobs.net/api/4/offer/${offerId}/application`,
      {
        offerOpenQuestions: [],
        offerKillerQuestions: [],
      },
      {
        headers: {
          Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`,
        },
      },
    )

    res.status(200).json({ msg: 'postulado' })
  } catch (error) {
    console.log(error.response.data)
    res.status(500).json({ error })
  }
}
