import React, { Component } from 'react'
import '../../../styles/index.sass'
import Services from '../../../webapi/services'
import PrimeTypeItem from './PrimeTypeItem'


const STATES = {
    LIST: 'LIST',
    NEW_PRIME: 'NEW_PRIME'
}

export default class CreatePrimeType extends Component {
    
    constructor(props) {
        super(props)
        this.services = new Services()
        this.state = {
            currentState: STATES.LIST,
            primeTypeList: []
        }
    }

    componentWillMount() {
        this._loadPrimes()
    }

    _loadPrimes = () => {
        this.services.getPrimeTypes().then(primeTypeList => {
            console.log('state prime ' + JSON.stringify(primeTypeList))
            this.setState({
                primeTypeList: primeTypeList
            })
        })
    }

    _onChange = event => {
        const { target: { name, value } } = event
        this.setState({
            currentPrime: value
        })
    }

    _newPrime = () => {
        this.setState({
            currentState: STATES.NEW_PRIME
        })
    }

    _createPrime = () => {
       const { currentPrime, primeTypeList } = this.state
        this.services
        .createPrimeType(currentPrime)
        .then(body => {
            var newPrimeTypeList = primeTypeList
            newPrimeTypeList.push({
                id: primeTypeList[primeTypeList.length-1].id+1,
                name: currentPrime})
            this.setState({
                primeTypeList: newPrimeTypeList
            })
        })
    }

    _deletePrimeType = (id) => {
       this.services.removePrimeType(id)
        const { primeTypeList } = this.state

       var primeTypeFiltered = primeTypeList.filter(primeType => {
           return primeType.id !== id
       })

       this.setState({
            primeTypeList: primeTypeFiltered
       })
    }

    render() {
        const { currentState, primeTypeList} = this.state
        return (
            <div>
                {primeTypeList.map(primeType => {
                    return (
                        <PrimeTypeItem 
                         key={primeType.id}
                         remotePrimeType={this._deletePrimeType}
                         primeTypeItem={primeType}
                        /> 
                    )
                })

                }
                <div className='submit-form'>
                   <button onClick={this._newPrime}>Nueva Prima</button>
                </div>
                {/* <form> */}
                    {currentState === STATES.NEW_PRIME &&
                        <div>
                            <div className='form-group'>
                                <label>Agregue el tipo de prima</label>
                                <input type='text' name='primeType' onChange={this._onChange} />
                            </div>
                            <div className='submit-form'>
                                <button onClick={this._createPrime}>Agregar prima</button>
                            </div>
                        </div>
                    }
                {/* </form> */}
            </div>
        )
    }
}