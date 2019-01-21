import React, { Component } from 'react'
import '../../styles/index.sass'
import Services from '../../webapi/services'
import PrimeTypeItem from './PrimeTypeItem'


const STATES = {
    LIST: 'LIST',
    NEW_AREA_TYPE: 'NEW_AREA_TYPE'
}

export default class CreateAreaType extends Component {
    
    constructor(props) {
        super(props)
        this.services = new Services()
        this.state = {
            currentState: STATES.LIST,
            areaTypeList: []
        }
    }

    componentWillMount() {
        this._loadAreaTypes()
    }

    _loadAreaTypes = () => {
        this.services.getAreaTypes().then(areaList => {
            const { areaTypes } = areaList
            console.log('state prime ' + JSON.stringify(areaList))
            this.setState({
                areaTypeList: areaTypes
            })
        })
    }

    _onChange = event => {
        const { target: { name, value } } = event
        this.setState({
            currentType: value
        })
    }

    _newAreaType = () => {
        this.setState({
            currentState: STATES.NEW_AREA_TYPE
        })
    }

    _createAreaType = () => {
       const { currentType, areaTypeList } = this.state
        this.services
        .createAreaType(currentType)
        .then(body => {
            var newTypeList = areaTypeList
            newTypeList.push({
                id: areaTypeList[areaTypeList.length-1].id+1,
                name: currentType})
            this.setState({
                areaTypeList: newTypeList
            })
        })
    }

    _deleteAreaType = (id) => {
       this.services.removeAreaType(id)
        const { areaTypeList } = this.state

       var typeFiltered = areaTypeList.filter(type => {
           return type.id !== id
       })

       this.setState({
            areaTypeList: typeFiltered
       })
    }

    render() {
        const { currentState, areaTypeList} = this.state
        return (
            <div>
                {
                    areaTypeList && areaTypeList.map(type => {
                    return (
                        <PrimeTypeItem 
                         key={type.id}
                         remotePrimeType={this._deleteAreaType}
                         primeTypeItem={type}
                        /> 
                    )
                })

                }
                <div className='submit-form'>
                   <button onClick={this._newAreaType}>Nuevo typo de area</button>
                </div>
                {/* <form> */}
                    {currentState === STATES.NEW_AREA_TYPE &&
                        <div>
                            <div className='form-group'>
                                <label>Agregue el tipo de area</label>
                                <input type='text' name='primeType' onChange={this._onChange} />
                            </div>
                            <div className='submit-form'>
                                <button onClick={this._createAreaType}>Agregar</button>
                            </div>
                        </div>
                    }
                {/* </form> */}
            </div>
        )
    }
}