import request from 'superagent'
import { API_PATH } from './config'

export const getPrimeTypes = query => {
    return request.get(`${API_PATH}/area/primeType`).query(query)
}

export const removePrimeType = data => {
    return request.delete(`${API_PATH}/area/removePrimeType`).send(data)
}

export const removePrime = data => {
    return request.delete(`${API_PATH}/area/removePrime`).send(data)
}

export const removeAllPrime = data => {
    return request.delete(`${API_PATH}/area/removeAllPrime`).send(data)
}

export const createPrimeType = data => {
    return request.post(`${API_PATH}/area/createPrimeType`).send(data)
}

export const getPrimeList = query => {
    return request.get(`${API_PATH}/area/prime`).query(query)
}

export const createPrime = data => {
    return request.post(`${API_PATH}/area/createPrime`).send(data)
}

export const createPrimeList = data => {
    return request.post(`${API_PATH}/area/createPrimeList`).send(data)
}

export const getAreaList = query => {
    return request.get(`${API_PATH}/area/all`).query(query)
}

export const removeAreaType = data => {
    return request.delete(`${API_PATH}/area/removeAreaType`).send(data)
}

export const createAreaType = data => {
    return request.post(`${API_PATH}/area/createType`).send(data)
}

export const getPropertyTypology = () => {
    return request.get(`${API_PATH}/area/propertyType`).query()
}

export const createArea = data => {
    return request.post(`${API_PATH}/area/create`).send(data)
}

export const removeArea = data => {
    return request.delete(`${API_PATH}/area/removeArea`).send(data)
}

export const createPropertyTypology = data => {
    return request.post(`${API_PATH}/area/createPropertyType`).send(data)
}

export const removePropertyTypology = data => {
    return request.delete(`${API_PATH}/area/propertyType`).send(data)
}