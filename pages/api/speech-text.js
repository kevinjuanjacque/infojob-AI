import { convertToMP3 } from '@infojob/functions/mwebToMp3'
import formidable from 'formidable'
import path from 'path'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

const readFile = (req, save) => {
  const option = {}

  if (save) {
    option.uploadDir = path.join('tmp')
    option.filename = (name, ext, path, form) => {
      return `${Date.now().toString()}-${path.originalFilename}`
    }
  }

  const form = formidable(option)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      resolve({ fields, files })
    })
  })
}

export default async function handle(req, res) {
  try {
    const response = await readFile(req, true)

    // await convertToMP3(response.files.file.filepath)

    let data = new FormData()
    data.append('file', fs.createReadStream(response.files.file.filepath))
    data.append('model', 'whisper-1')

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.openai.com/v1/audio/transcriptions',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_OPENIA}`,
        ...data.getHeaders(),
      },
      data: data,
    }

    const resp = await axios
      .request(config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw error
      })

    res.status(200).json({ msg: 'Success', transcriptions: resp })
  } catch (error) {
    res.status(500).json({ msg: 'Error', error })
  }
}
