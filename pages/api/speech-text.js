import { convertToMP3 } from "@infojob/functions/mwebToMp3";
import formidable from "formidable"
import path from "path"
import axios from "axios"
import FormData from 'form-data';
import fs from 'fs';




export const config = {
    api: {
      bodyParser: false,
    },
}



const readFile = (req,save) => {
  const option = {};

  if(save){
    option.uploadDir = path.join(process.cwd(),'public','uploads')
    option.filename=(name,ext,path,form)=>{
      return `${Date.now().toString()}-${path.originalFilename}`
    }
  }


  const form = formidable(option)
  return new Promise((resolve,reject)=>{
      form.parse(req,(err,fields,files)=>{
        if(err){
          return reject(err)
        }
        resolve({fields,files})
      })
  })
  }
  
  export default async function handle(req,res) {
  const response = await readFile(req,true);
  console.log(response.files.file.filepath)
  // await convertToMP3(response.files.file.filepath)

  
  let data = new FormData();
  data.append('file', fs.createReadStream(response.files.file.filepath));
  data.append('model', 'whisper-1');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.openai.com/v1/audio/transcriptions',
  headers: { 
    'Authorization': `Bearer ${process.env.TOKEN_OPENIA}`, 
    ...data.getHeaders()
  },
  data : data
};

  const resp = await axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data
  })
  .catch((error) => {
    console.log(error);
  });

  res.status(200).json({msg:'Success', transcriptions:resp})
}