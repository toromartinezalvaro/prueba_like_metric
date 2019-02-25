import {
    getPrimeTypes,
    removePrimeType,
    removePrime,
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
    removePropertyTypology,
    removeAllPrime,
    getProperties,
    createProperties
} from './area'

export default class Services {
    constructor() {}

    getPrimeTypes() {
        return new Promise((resolve, reject) => {
            getPrimeTypes({}).then(({
                body
            }) => {
                // console.log('trying body' + JSON.stringify(body))
                const {
                    primeTypeList
                } = body

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
        }).then(({
            body
        }) => {
            // console.log('trying body' + JSON.stringify(body))
        })
    }

    removeAllPrime() {
        return new Promise((resolve, reject) => {
            removeAllPrime({}).then(({
                body
            }) => {
                const {
                    primes,
                    primeTypes
                } = body

                if (primes) {
                    return resolve(body)
                } else {
                    return resolve({
                        primes: []
                    })
                }
            })
        })
    }

    removePrime(id) {
        return new Promise((resolve, reject) => {
            removePrime({
                id: id
            }).then(({
                body
            }) => {
                const {
                    primes,
                    primeTypes
                } = body

                if (primes) {
                    return resolve(body)
                } else {
                    return resolve({
                        primes: []
                    })
                }
            })
        })
    }

    createPrimeType(name) {
        return new Promise((resolve, reject) => {
            createPrimeType({
                name: name
            }).then(({
                body
            }) => {
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
            getAreaList({}).then(({
                body
            }) => {
                // console.log('trying body' + JSON.stringify(body))
                if (!body) {
                    return
                }
                const {
                    areaTypes,
                    areas
                } = body
                if (areaTypes && areas) {
                    return resolve(body)
                } else {
                    return resolve({
                        areaTypes: [],
                        areas: []
                    })
                }
            })
        })
    }

    removeAreaType(id) {
        removeAreaType({
            id: id
        }).then(({
            body
        }) => {
            // console.log('trying body' + JSON.stringify(body))
        })
    }

    createAreaType(name) {
        return new Promise((resolve, reject) => {
            createAreaType({
                name: name
            }).then(({
                body
            }) => {
                const {
                    areaTypeList
                } = body
                if (areaTypeList) {
                    return resolve(areaTypeList)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }

    getPrimeList() {
        return new Promise((resolve, reject) => {
            getPrimeList({}).then(({
                body
            }) => {
                // console.log('trying body' + JSON.stringify(body))
                const {
                    primes,
                    primeTypes
                } = body

                if (primes) {
                    return resolve(body)
                } else {
                    return resolve({
                        primes: [],
                        primeTypes: primeTypes
                    })
                }
            })
        })
    }

    createPrimeList(list) {
        // let parameters = list.map(prime => {
        //     return {

        //     }
        // })
        return new Promise((resolve, reject) => {
            createPrimeList(list).then(({
                body
            }) => {
                // console.log('trying body' + JSON.stringify(body))
                const {
                    primes,
                    primeTypes
                } = body
                if (primes && primeTypes) {
                    return resolve(body)
                } else {
                    return resolve(body)
                }
            })
        })
    }

    getPropertyTypology() {
        return new Promise((resolve, reject) => {
            getPropertyTypology().then(({
                body
            }) => {
                this.validatePropertyType(resolve, reject, body)
            })
        })
    }

    getProperties() {
        return new Promise((resolve, reject) => {
            getProperties().then(({
                body
            }) => {
                this.validateProperties(resolve, reject, body)
            })
        })
    }


    createPropertyTypology(typologies) {
        let parameters = typologies.map(type => {

            let areas = type.areas.map(area => {
                return {
                    id: area.isNew ? area.areaId : null
                }
            }).filter(area => {
                return area.id !== null
            })
            return {
                id: type.isNew ? null : type.id,
                name: type.name,
                areas: areas
            }
        })

        return new Promise((resolve, reject) => {
            createPropertyTypology(parameters).then(({
                body
            }) => {
                this.validatePropertyType(resolve, reject, body)
            })
        })
    }

    removePropertyTypology(id) {
        return new Promise((resolve, reject) => {
            removePropertyTypology({
                id: id
            }).then(({
                body
            }) => {
                this.validatePropertyType(resolve, reject, body)
            })
        })
    }

    validatePropertyType(resolve, reject, body) {
        const {
            propertyTypologies,
            areaTypes,
            areas
        } = body
        if (propertyTypologies && areaTypes && areas) {
            return resolve(body)
        } else {
            return resolve({
                propertyTypologies: [],
                areaTypes: [],
                areas: []
            })
        }
    }

    validateProperties(resolve, reject, body) {
        const {
            towerList,
            propertyTypologies,
            primeList
        } = body
        return resolve({
            towerList: towerList || [],
            primeList: primeList || [],
            propertyTypologies: propertyTypologies || []
        })
    }

    createProperties(property) {
        return new Promise((resolve, reject) => {
            createProperties([
                property
            ]).then(({
                body
            }) => {
                this.validateProperties(resolve, reject, body)
            })
        })
    }

    createArea(idType, reference, mt2, priceMT2) {
        return new Promise((resolve, reject) => {
            createArea({
                idType: idType,
                reference: reference,
                description: '',
                mt2: mt2,
                priceMt2: priceMT2
            }).then(({
                body
            }) => {
                const {
                    areas,
                    areaTypes
                } = body
                if (areas, areaTypes) {
                    return resolve(body)
                } else {
                    return {
                        areas: [],
                        areaTypes: []
                    }
                }
            })
        })
    }

    removeArea(id) {
        return new Promise((resolve, reject) => {
            removeArea({
                id: id
            }).then(({
                body
            }) => {
                const {
                    areas,
                    areaTypes
                } = body
                if (areas, areaTypes) {
                    return resolve(body)
                } else {
                    return reject(new Error("Not found"))
                }
            })
        })
    }
}