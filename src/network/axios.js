import axios from "axios"
console.log(process.env.VUE_APP_URL);
const instance = axios.create({
    baseURL : 'http://192.168.0.113:10086/smart-admin-api/',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return err
    }
)
instance.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        return err
    }
)
export {
    instance 
}