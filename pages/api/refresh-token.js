import axios from "axios";



export default async function refresh(req,res) {
    const {refresh_token} = req.headers;
    const response = await axios.get('https://www.infojobs.net/oauth/authorize',{
        params:{
            grant_type:'refresh_token',
            client_id:process.env.CLIENT_ID,
            client_secret:process.env.CLIENT_SECRET,
            refresh_token:refresh_token,
            redirect_uri:process.env.REDIRECT_URI
        }
    })

    res.json(response.data);
}