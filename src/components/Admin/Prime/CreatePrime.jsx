import React, { Component } from 'react'
import Services from '../../../webapi/services'
import EditingItem from './EditingItem'
import Icon from '../../Icon'


const STATES = {
    LIST: 'LIST',
    NEW_PRIME: 'NEW_PRIME'
}

export const PrimeTypes = {
    location: 25,
    floor: 27
}

export default class CreatePrime extends Component {

    constructor(props) {
        super(props)
        this.services = new Services()
        this.provisionalId = 0
        this.state = {
            currentState: STATES.LIST,
            primeList: [],
            primeTypes: [],
            floorAmount: 0,
            locationAmount: 0,
            currentEditingIndex: 0,
            currentEditingValue: 0
        }
    }

    componentWillMount() {
        this._loadPrimes()
    }

    _loadPrimes = () => {
        this.services.getPrimeList().then(body => {
            const { primes, primeTypes } = body
            console.log('state prime ' + JSON.stringify(primes))
            // var primeList = prime.map(item => {
            //     return { ...item, isEmpty: false }
            // })
            this.setState({
                primeList: primes
            })
        })
    }

    _onChange = event => {
        const { target: { name, value, key } } = event
        // const { primeList } = this.state

        // console.log('on change ' + JSON.stringify(event))
        // var prime = primeList.filter(current => {
        //     if (current.provisionalId) {

        //         return current.provisionalId === key
        //     } else {
        //         return current.id === key
        //     }
        // })

        // prime = {
        //     [name]: value
        // }

        // console.log('on change prime' + JSON.stringify(prime))
        this.setState({
            // primeList: { ...primeList, [name]: value }
            [name]: value
        })
    }

    _onSelectLocation = () => {
        const { primeList, locationEditingIndex, locationEditingValue } = this.state

        let primes = primeList.map(current => {
            if (current.idType == PrimeTypes.location && current.id == locationEditingIndex) {
                current.priceMT2 = locationEditingValue
                current.isUpdated = true
            }
            return current
        })

        this.setState({
            primeList: primes
        })
    }

    _onSelectFloor = () => {
        const { primeList, floorEditingIndex, floorEditingValue } = this.state

        let primes = primeList.map(current => {
            if (current.idType == PrimeTypes.floor && current.id == floorEditingIndex) {
                current.priceMT2 = floorEditingValue
                current.isUpdated = true
            }
            return current
        })

        this.setState({
            primeList: primes
        })
    }

    _createPrime = () => {
        const { primeList } = this.state

        let newPrimes = primeList.filter(prime => {
            return prime.priceMT2 > 0
        })

        if (primeList.length > 0 && newPrimes.length == primeList.length) {
                    this.services
                        .createPrimeList(primeList)
                        .then(body => {
                            const { primeTypes, primes } = body
                            this.setState({
                                primeList: primes,
                                primeTypes: primeTypes
                            })
                        })
        } else {
            alert("Por favor indique los precios de todos los pisos y de las ubicaciones")
        }
    }



    _removeAllPrime = () => {
        if (window.confirm("Desea eliminar todas las primas actuales")) {
            this.services
            .removeAllPrime()
            .then(body => {
                const { primeTypes, primes } = body
                this.setState({
                    primeList: primes,
                    primeTypes: primeTypes
                })
            })
        }
    }

    _updateQuantities = () => {
        const { floorAmount, locationAmount, primeList } = this.state

        let areaJustUnsavePrimes =  primeList.reduce((value, prime) => {
            return prime.isNew
        }, false)
        
        if (!areaJustUnsavePrimes && primeList.length > 0) {
            alert("Por favor elimina todas las primas actuales")
            return
        }

        let locationArray = Array.apply(null, { length: locationAmount }).map(Number.call, Number).map(index => {
            return {
                id: index,
                idType: PrimeTypes.location,
                reference: index + 1,
                priceMT2: 0,
                isNew: true,
                isUpdated: false
            }
        })

        let floorArray = Array.apply(null, { length: floorAmount }).map(Number.call, Number).map(index => {
            return {
                id: index,
                idType: PrimeTypes.floor,
                reference: index + 1,
                priceMT2: 0,
                isNew: true,
                isUpdated: false
            }
        })

        let locationEditingItem = locationArray[0]
        let floorEditingItem = floorArray[0]

        this.setState({
            primeList: [...locationArray, ...floorArray],
            locationEditingIndex: locationEditingItem.id,
            locationEditingValue: locationEditingItem.reference,
            floorEditingIndex: floorEditingItem.id,
            floorEditingValue: floorEditingItem.reference
        })
    }

    _removeItem = (id) => {
        //    this.services.removePrimeType(id)
        //     const { primeTypeList } = this.state

        //    var primeTypeFiltered = primeTypeList.filter(primeType => {
        //        return primeType.id !== id
        //    })

        //    this.setState({
        //         primeTypeList: primeTypeFiltered
        //    })
    }


    findName(prime) {
        const { primeTypes } = this.state
        let typeFound = primeTypes.find(type => {
            return type.id === prime.idType
        })

        if (typeFound) {
            return typeFound.name
        } else {
            return ''
        }
    }

    createFormGroup(name, value, label, type = 'number') {
        return (<div className='form-group'>
            <label>{label}</label>
            <input type={type} name={name} value={value} onChange={this._onChange} />
        </div>)
    }

    _itemByPrime(description, name, mainName = 'item') {
        return (<div className={mainName + " " + name}>
            <label >
                {
                    description
                }
            </label>
        </div>)
    }

    _removePrime = (prime) => {
        const { primeList } = this.state
        let maxPrime = primeList.reduce((prime, next) => {
            return next.reference > prime.reference ? next : prime
        })

        if (prime.id == maxPrime.id) {
            if (prime.isNew) {
                let primeRemoved = primeList.filer(item => {
                    return item === prime
                })
                this.state({
                    primeList: primeRemoved
                })
            } else {
                this.services.removePrime(prime.id).then(primes => {
                    this.state({
                        primeList: primes
                    })
                })
            }
        }
    }

    _removeIconForPrime(prime) {
        return (
            <div className='close' onClick={() => this._removePrime(prime)}>
                <Icon name='close' />
            </div>
        )
    }


    render() {
        const { primeList,
            floorAmount,
            locationAmount,
            locationEditingIndex,
            locationEditingValue,
            floorEditingIndex,
            floorEditingValue } = this.state
        return (
            <div>
                <div className='prime'>
                    <div className='type-prime'>
                        {
                            [
                                this.createFormGroup('floorAmount', floorAmount, '# Pisos'),
                                this.createFormGroup('locationAmount', locationAmount, 'Cantidad de Ubicaciones')
                            ]
                        }
                        <div className='submit-form'>
                            <button onClick={this._updateQuantities}>Aceptar</button>
                        </div>
                    </div>
                    <div className='create-prime'>
                        <div className='title'>
                            <label>Editar precios de la ubicación</label>
                        </div>
                        <div className='create-location-prime'>
                            {<EditingItem
                                primeList={primeList}
                                primeTypeId={PrimeTypes.location}
                                currentEditingValue={locationEditingValue}
                                currentEditingIndex={locationEditingIndex}
                                idEditingIndex='locationEditingIndex'
                                idEditingValue='locationEditingValue'
                                onSelect={this._onSelectLocation}
                                onChange={this._onChange}
                            />
                            }

                            <div className='prime-list'>
                                {
                                    ['Referencia', 'Valor mt2'].map(item => {
                                        return this._itemByPrime(item, item, item.length > 0 ? 'header' : 'helper')
                                    })
                                }
                                {
                                    primeList.filter(prime => {
                                        return prime.idType == PrimeTypes.location
                                    }).flatMap(prime => {
                                        return [
                                            this._itemByPrime(prime.reference, 'reference'),
                                            this._itemByPrime(prime.priceMT2, 'priceMT2')
                                        ]
                                    })
                                }
                            </div>
                        </div>
                        <div className='create-floor-prime'>
                            <div className='title'>
                                <label>Editar precios de cada piso</label>
                            </div>
                            {<EditingItem
                                primeList={primeList}
                                primeTypeId={PrimeTypes.floor}
                                currentEditingValue={floorEditingValue}
                                currentEditingIndex={floorEditingIndex}
                                idEditingIndex='floorEditingIndex'
                                idEditingValue='floorEditingValue'
                                onSelect={this._onSelectFloor}
                                onChange={this._onChange}
                            />

                            }

                            <div className='prime-list'>
                                {
                                    ['Referencia', 'Valor mt2'].map(item => {
                                        return this._itemByPrime(item, item, item.length > 0 ? 'header' : 'helper')
                                    })
                                }
                                {
                                    primeList.filter(prime => {
                                        return prime.idType == PrimeTypes.floor
                                    }).flatMap(prime => {
                                        return [
                                            this._itemByPrime(prime.reference, 'reference'),
                                            this._itemByPrime(prime.priceMT2, 'priceMT2')
                                        ]
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='submit-form'>
                    <button onClick={this._createPrime}>Guardar todo</button>
                </div>
                <div className='submit-form'>
                    <button onClick={this._removeAllPrime}>Eliminar todo</button>
                </div>
            </div>
        )
    }
}