// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { code } = req.body

    const response = await axios.post(
      `https://www.infojobs.net/oauth/authorize?grant_type=authorization_code&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`,
    )

    return res.status(200).json({ ...response.data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
