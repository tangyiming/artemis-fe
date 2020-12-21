import axios from 'axios'
import { message } from 'ant-design-vue'

function checkCode(response = {}) {
    if (response.status === 200 || response.data.code === 200) {
        return response.data
    } else {
        if (response.message || response.data.message) {
            console.log('warning')
        }
        return {}
    }
}

axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api/'
// process.env.NODE_ENV === 'development' ? '/api/' : ''

axios.interceptors.request.use(
    config => {
        //使用slice去掉token两边的双引号
        config.headers.Authorization = typeof localStorage['token'] == 'undefined' ? 'no auth' : localStorage['token'].slice(1, -1)
        return config
    },
    error => Promise.reject(error)
)
axios.interceptors.response.use(
    response => checkCode(response),
    err => {
        if (err.response.status === 401 && err.response.data.msg === '非授权访问') {
            message.warning({ content: '非授权访问，请先登录！' })
        }
        return Promise.reject(err)
    }
)

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: data,
        })
    },
    postFormData(url, data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return axios({
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            url,
            data: ret,
        })
    },
    postMultipartFormData(url, data) {
        return axios({
            method: 'post',
            headers: {
                'Content-type': 'multipart/form-data',
            },
            url,
            data: data,
        })
    },
    put(url, data) {
        return axios({
            method: 'put',
            url,
            data: data,
        })
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
        })
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            url,
            data: params,
        })
    },
}
