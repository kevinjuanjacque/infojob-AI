import { createDescription } from "@infojob/functions/createDescription"
import { createCV } from "@infojob/functions/createUserDescription"
import axios from "axios"


const URL_CV= "https://api.infojobs.net/api/2/curriculum"

export default async function Evaluated(req,res) {

   try {
    const {access_token} = req.headers;
    console.log(access_token)
    const {id} = req.body;
    const cvData = await axios.get(URL_CV,{
        headers:{
            Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`
        }
    })

    const cv = cvData.data[0];

    const skillsData = await axios.get(`${URL_CV}/${cv.code}/skill`,{
        headers:{
            Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`
        }
    })


    const experienceData = await axios.get(`${URL_CV}/${cv.code}/experience`,{
        headers:{
            Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`
        }
    });
    const educationData = await axios.get(`https://api.infojobs.net/api/1/curriculum/${cv.code}/education`,{
        headers:{
            Authorization: `Basic ${process.env.TOKEN_BASIC},Bearer ${access_token}`
        }
    });

    const offertData = await axios.get(`https://api.infojobs.net/api/7/offer/${id}`,{
        headers:{
            Authorization: `Basic ${process.env.TOKEN_BASIC}`
        }
    })

    const experience = experienceData.data;

    const education = educationData.data;

    const skills = skillsData.data;

    const details = offertData.data


    const textOffer = createDescription(details);

    const textUser = createCV(cvData.data,skills,experience,education);


    const msg =`descripción del trabajo:
    ${textOffer}
    
    información del usuario:
    ${textUser}`


    res.json({msg})
   } catch (error) {
    res.status(500).json({
        error
    })
   }




}