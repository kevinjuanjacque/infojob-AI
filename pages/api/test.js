// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'


export default async function  handler(req, res) {
  const {code} = req.body

  const response = await axios.post(
    `https://www.infojobs.net/oauth/authorize?grant_type=authorization_code&client_id=a0fa4caafbf84c298b07ce2658489933&client_secret=DH2Sn6ZWB4vywfbjSFWM4chJn2UzdHYpPd%2FAsYaGG3wrMMS7ox&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`
  )

  return res.status(200).json({...response.data })
}
