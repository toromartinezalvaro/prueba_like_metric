import React, { Component } from 'react'
// import '../../styles/index.sass'
import Services from './../../webapi/services'
import PrimeTypeItem from './PrimeTypeItem'
import EditingItem from './EditingItem';


const STATES = {
    LIST: 'LIST',
    NEW_PRIME: 'NEW_PRIME'
}

export default class CreatePrime extends Component {

    constructor(props) {
        super(props)
        this.services = new Services()
        this.provisionalId = 0
        this.state = {
            currentState: STATES.LIST,
            primeList: [],
            primeTypes: []
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
                primeList: primes,
                primeTypes: primeTypes
            })
        })
    }

    _onChange = event => {
        const { target: { name, value, key } } = event
        const { primeList } = this.state

        console.log('on change ' + JSON.stringify(event))
        var prime = primeList.filter(current => {
            if (current.provisionalId) {
                return current.provisionalId === key
            } else {
                return current.id === key
            }
        })

        prime = {
            [name]: value
        }

        console.log('on change prime' + JSON.stringify(prime))
        // this.setState({
        //     primeList: { ...primeList, [name]: value }
        // })
    }

    _onSelect = event => {
        console.log('on select ' + JSON.stringify(event))
    }

    _newPrime = () => {
        // let newPrime = {
        //     id: null,
        //     provisionalId: this.provisionalId,
        //     idType: null,
        //     reference: null,
        //     priceMT2: null
        // }

        // this.provisionalId++

        // this.setState({
        //     primeList: [...primeList, newPrime]
        // })
    }

    _createPrime = () => {
        const { primeList } = this.state

        let newPrimes = primeList.filter(prime => {
            return prime.id === null
        })

        this.services
            .createPrimeList(newPrimes)
            .then(body => {
                const { primeTypes, primes } = body
                this.setState({
                    primeList: primes,
                    primeTypes: primeTypes
                })
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

    render() {
        const { primeList, primeTypes } = this.state
        return (
            <div>
                <table className="cash-flow">
                    <thead>
                        {["tipo", "referencia", "precio mt2"].map(name => {
                            return (
                                <td key={name}>
                                    {name}
                                </td>
                            )
                        })}
                    </thead>
                    <tbody>
                        {
                            primeList.map(prime => {
                                return (
                                    <tr key={prime.id}>
                                            <td>
                                               {
                                                   this.findName(prime)
                                               } 
                                            </td>
                                            <td>
                                               { prime.reference } 
                                            </td>
                                            <td>
                                               { prime.priceMT2 } 
                                            </td>
                                            <td className='submit-form'>
                                                <button onClick={this._removeItem}>Eliminar</button>
                                            </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
                { primeTypes &&
                <EditingItem
                types={primeTypes}
                onSelect={this._onSelect}
                onChange={this._onChange}
            />

                }
                {/* <form> */}
                {/* {currentState === STATES.NEW_PRIME &&
                        <div>
                            <div className='form-group'>
                                <label>Agregue el tipo de prima</label>
                                <input type='text' name='primeType' onChange={this._onChange} />
                            </div>
                            <div className='submit-form'>
                                <button onClick={this._createPrime}>Agregar prima</button>
                            </div>
                        </div>
                    } */}
                {/* </form> */}
            </div>
        )
    }
}