import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'


const ApiClient = () => {
    const instance = axios.create()
    instance.interceptors.request.use(async (request) => {
        const access_token = getCookie('access_token');
        if(access_token){
            request.headers.access_token = access_token;
        }else{
            const refresh_token = getCookie('refresh_token');

            const response = await axios.get('/api/refresh-token',{
                headers:{
                    refresh_token
                }
            })
            setCookie('access_token',response.data.access_token,{
                expires: new Date(Date.now() + response.data.expires_in )
            });
            request.headers.access_token = response.data.access_token;

        }
        return request
    })

    

    return instance
}

export default ApiClient()