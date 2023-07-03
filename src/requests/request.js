import axios from 'axios'
import router from "@/router/router";

function request_set_token(axios_instance) {
    axios_instance.interceptors.request.use(      // set token
        config => {
            // do something before request is sent
            if (config.url.indexOf('/login') < 0) {
                config.headers.Token = localStorage.getItem('crack_token')
                config.headers.Authorization = localStorage.getItem('crack_token')
            }
            return config
        },
        error => {
            // do something with request error
            return Promise.reject(error)
        }
    )
}

function response_login_failed(axios_instance) {
    axios_instance.interceptors.response.use( // handle login failed
        response => {
            return response;
        },
        error => {
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        window.localStorage.removeItem("crack_token")
                        window.localStorage.removeItem('crack_role')
                        window.localStorage.removeItem("crack_login")
                        this.$router.replace('/login')
                }
            }
            return Promise.reject(error)
        })
}

function response_token_expired(axios_instance) {
    axios_instance.interceptors.response.use( // handle token expired
        response => {
            if (response.data.code === 102) {
                window.localStorage.removeItem('crack_token')
                window.localStorage.removeItem('crack_role')
                router.push({path: '/login'})
            }
            return response
        },
        error => {
            return Promise.reject(error)
        })
}

export function request(ip, timeout) {
    // create an axios instance
    const instance = axios.create({
        baseURL: ip,
        timeout: timeout
    })

    // request interceptor
    request_set_token(instance)

    // response interceptor
    response_login_failed(instance)
    response_token_expired(instance)

    return instance.request
}
