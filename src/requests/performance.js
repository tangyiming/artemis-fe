import http from '../utils/http'

export const save = (p) => http.post('/perf/save', p)
