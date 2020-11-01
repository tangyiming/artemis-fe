import http from '../utils/http'

export const build = p => http.post('/jenkins/build',p)
export const result = p => http.postFormData('/jenkins/result', p)