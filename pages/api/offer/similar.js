import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { puesto, maxResults, page } = req.body

    const offer = await axios.get(
      `https://api.infojobs.net/api/9/offer?q=puesto:"${puesto}"&maxResults=${maxResults}&page=${page}`,
      {
        headers: {
          Authorization: `Basic ${process.env.TOKEN_BASIC}`,
        },
      },
    )

    res.status(200).json({ ...offer.data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
