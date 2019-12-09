import http from '../utils/http'

export const getSms = p => http.postFormdata('/tool/sms', p)

export const addAsset = p => http.post('/tool/addAssert', p)

export const getAssetInfo = p => http.post('/tool/getAssetInfo', p)

export const deleteAsset = p => http.get(`/tool/${p}`)

export const updateAsset = p => http.post('/tool/updateAsset', p)

export const queryAsset = p => http.post('/tool/queryAsset', p)

export const mockData = p => http.postFormdata('/tool/mockData', p)

export const queryUser = p => http.post('/tool/queryUser', p)
