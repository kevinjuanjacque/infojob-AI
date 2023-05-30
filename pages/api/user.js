import axios from 'axios'

const URL_CV = 'https://api.infojobs.net/api/2/curriculum'

export default async function User(req, res) {
  try {
    const { access_token } = req.headers
    const cv = await axios.get(URL_CV, {
      headers: {
        Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`,
      },
    })

    const { name, code } = cv.data[0]

    const skills = await axios.get(`${URL_CV}/${code}/skill`, {
      headers: {
        Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`,
      },
    })

    const experience = await axios.get(`${URL_CV}/${code}/experience`, {
      headers: {
        Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`,
      },
    })

    const allSkillExperience = [].concat(
      ...experience.data.experience.map((item) =>
        item.expertise.map((skill) => skill.skill),
      ),
    )

    const skillExperience = [...new Set(allSkillExperience)]

    const jobs = [
      ...experience.data.experience.map((item) => item.job),
      'Developer',
    ]

    const offer = await axios.get(
      `https://api.infojobs.net/api/9/offer?q=puesto:"${jobs[0]}"&maxResults=10`,
      {
        headers: {
          Authorization: `Basic ${process.env.TOKEN_BASIC}`,
        },
      },
    )

    res.json({
      name,
      skills: skills.data,
      skillExperience,
      jobs,
      offer: offer.data.offers,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
