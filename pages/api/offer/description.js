import axios from "axios";



export default async function description(req,res) {

    const {id} = req.query;

    if(!id){
        return res.status(400).json({message:'Missing id'})
    }



    try {
        const offertData = await axios.get(`https://api.infojobs.net/api/7/offer/${id}`,{
        headers:{
            Authorization: `Basic ${process.env.TOKEN_BASIC}`
        }
    })

    const details = offertData.data

    return res.status(200).json({msg:'Success',details})
    } catch (error) {
     console.log(error.response.data)
        return res.status(400).json({msg:'Error',error})
    }
}