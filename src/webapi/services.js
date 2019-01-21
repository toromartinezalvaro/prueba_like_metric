import { 
    getPrimeTypes,
    removePrimeType,
     createPrimeType,
      createAreaType,
       removeAreaType,
        getAreaList,
         getPrimeList,
          createPrimeList,
           getPropertyTypology,
            createArea,
             removeArea,
             createPropertyTypology,
             removePropertyTypology
             } from './area'

export default class Services {
    constructor() { }

    getPrimeTypes() {
        return new Promise((resolve, reject) => {
            getPrimeTypes({}).then(({ body }) => {
                // console.log('trying body' + JSON.stringify(body))
                const { primeTypeList } = body

                if (primeTypeList) {
                    return resolve(primeTypeList)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    removePrimeType(id) {
        removePrimeType({
            id: id
        }).then(({ body }) => {
            // console.log('trying body' + JSON.stringify(body))
        })
    }

    createPrimeType(name) {
        return new Promise((resolve, reject) => {
            createPrimeType({
                name: name
            }).then(({ body }) => {
                // console.log('trying body' + JSON.stringify(body))
                if (body) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    getAreaList() {
        return new Promise((resolve, reject) => {
            getAreaList({}).then(({ body }) => {
                // console.log('trying body' + JSON.stringify(body))
                const { areaTypes, areas } = body
                if (areaTypes  && areas) {
                    return resolve(body)
                } else {
                    return resolve({areaTypes: [], areas: []})
                }
            })
        })
    }

    removeAreaType(id) {
        removeAreaType({
            id: id
        }).then(({ body }) => {
            // console.log('trying body' + JSON.stringify(body))
        })
    }

    createAreaType(name) {
        return new Promise((resolve, reject) => {
            createAreaType({
                name: name
            }).then(({ body }) => {
                // console.log('trying body' + JSON.stringify(body))
                if (body) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    getPrimeList() {
        return new Promise((resolve, reject) => {
            getPrimeList({}).then(({ body }) => {
                // console.log('trying body' + JSON.stringify(body))
                const { primes, primeTypes } = body

                if (primes, primeTypes) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    createPrimeList(list) {
        return new Promise((resolve, reject) => {
            createPrimeList(list).then(({ body }) => {
                // console.log('trying body' + JSON.stringify(body))
                const { primes, primeTypes } = body
                if (primes && primeTypes) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    getPropertyTypology() {
        return new Promise((resolve, reject) => {
            getPropertyTypology().then(({ body }) => {
                console.log('trying body' + JSON.stringify(body))
                const { propertyTypologies, areaTypes, areas } = body
                if (propertyTypologies && areaTypes && areas) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }


    createPropertyTypology(typologies) {
        let parameters = typologies.map(type => {

            let areas = type.areas.map(area => {
                return {
                    id: area.isNew ? null : area.areaId
                }
            }).filter(area => { area.id !== null })

            return {
                id: type.isNew ? null : type.id,
                name: type.name,
                areas: areas
            }
        })

        console.log('trying body' + JSON.stringify(parameters))
        return new Promise((resolve, reject) => {
            createPropertyTypology(parameters).then(({ body }) => {
                const { propertyTypologies, areaTypes, areas } = body
                if (propertyTypologies && areaTypes && areas) {
                    return resolve(body)
                } else {
                    return resolve([])
                }
            })
        })
    }

    removePropertyTypology(id) {
        return new Promise((resolve, reject) => {
            removePropertyTypology({
                id: id
            }).then(({ body }) => {
                const { propertyTypologies, areaTypes, areas } = body
                if (propertyTypologies && areaTypes && areas) {
                    return resolve(body)
                } else {
                    return resolve({
                        propertyTypologies: [],
                        areaTypes: [],
                        areas: []
                    })
                }
            })
        })
    }

    createArea(idType, reference, mt2, priceMt2) {
        return new Promise((resolve, reject) => {
            createArea({
                idType: idType,
                reference: reference,
                description: '',
                mt2: mt2,
                priceMt2: priceMt2
            }).then(({ body }) => {
                const { areas, areaTypes } = body
                if (areas, areaTypes) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    removeArea(id) {
        return new Promise((resolve, reject) => {
            removeArea({
                id: id
            }).then(({ body }) => {
                const { areas, areaTypes } = body
                if (areas, areaTypes) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }
}