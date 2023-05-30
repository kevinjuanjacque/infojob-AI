import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { puesto, maxResults, page } = req.body

    const offer = await axios.get(
      `https://api.infojobs.net/api/9/offer?q=puesto:"${puesto}"&maxResults=${maxResults}&page=${page}&facets=true`,
      {
        headers: {
          Authorization: `Basic ${process.env.TOKEN_BASIC}`,
        },
      },
    )
    const jobs = []
    for (let i = 0; i < offer.data.offers.length; i++) {
      const job = offer.data.offers[i]
      const questionJob = await axios.get(
        `https://api.infojobs.net/api/1/offer/${job.id}/question`,
        {
          headers: {
            Authorization: `Basic ${process.env.TOKEN_BASIC}`,
          },
        },
      )
      if (
        questionJob.data.openQuestions.length == 0 &&
        questionJob.data.killerQuestions.length == 0
      ) {
        jobs.push(job)
      }
    }

    res.status(200).json({ ...offer.data, offers: jobs })
  } catch (error) {
    res.status(500).json({ error })
  }
}
