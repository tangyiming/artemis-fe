import http from '../utils/http'

export const login = p => http.post('/user/login', p)