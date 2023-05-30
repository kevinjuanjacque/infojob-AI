import axios from 'axios'
import { getCookie, removeCookies, setCookie } from 'cookies-next'

const ApiClient = () => {
  const instance = axios.create()
  instance.interceptors.request.use(async (request) => {
    const access_token = getCookie('access_token')
    console.log(access_token)
    if (access_token) {
      request.headers.access_token = access_token
    } else {
      const refresh_token = getCookie('refresh_token')

      await axios
        .get('/api/refresh-token', {
          headers: {
            refresh_token,
          },
        })
        .then((res) => {
          const fechaActual = new Date()
          const fechaSumada = new Date(fechaActual.getTime() + 40)
          console.log(
            new Date(
              fechaActual.getFullYear,
              fechaActual.getMonth,
              fechaActual.getDate,
              fechaActual.getHours,
              fechaActual.getMinutes,
              fechaActual.getSeconds,
            ),
          )
          setCookie('access_token', res.data.access_token, {
            maxAge: 400,
          })
          setCookie('refresh_token', res.data.refresh_token)

          request.headers.access_token = res.data.access_token
        })
        .catch((err) => {
          removeCookies('access_token')
          removeCookies('refresh_token')
          removeCookies('code')
        })
    }

    return request
  })

  return instance
}

export default ApiClient()
