import axios from 'axios'

export default async function index(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'Missing id' })
  }

  try {
    const response = await axios.get(
      `https://api.heygen.com/v1/video_status.get?video_id=${id}`,
      {
        headers: {
          'X-Api-Key': process.env.TOKEN_HEY,
        },
      },
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error })
  }
}
