import axios from 'axios'

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
//process.env.NODE_ENV === 'development' ? '/api/' : ''
axios.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
)
axios.interceptors.response.use(
    response => checkCode(response),
    err => {
        return Promise.reject(err)
    }
)

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: data
        })
    },
    postFormdata(url, data) {
        let ret = ''
        for (let it in data) {
            ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
        }
        return axios({
            method: 'post',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            url,
            data: ret
        })
    },
    put(url, data) {
        return axios({
            method: 'put',
            url,
            data: data
        })
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params
        })
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            url,
            params
        })
    }
}
