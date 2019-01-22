import React, { Component } from 'react'
import Services from '../../webapi/services'
import PrimeTypeItem from './PrimeTypeItem'
import AreaListGrid from './AreaListGrid'
import StringHelper from './../../Helpers/StringHelper'


const STATES = {
    LIST: 'LIST',
    NEW_AREA_TYPE: 'NEW_AREA_TYPE'
}

const ComponentId = {
    newAreaType: 'newAreaType',
    areaType: 'idType',
    areaReference: 'reference',
    areaMt2: 'mt2',
    areaPriceMt2: 'priceMt2'
}

export default class CreateArea extends Component {

    constructor(props) {
        super(props)
        this.services = new Services()
        this.state = {
            currentState: STATES.LIST,
            areaTypeList: [],
            [ComponentId.areaType]: "",
            [ComponentId.areaReference]: 0,
            [ComponentId.areaMt2]: "",
            [ComponentId.areaPriceMt2]: ""
        }
    }

    componentWillMount() {
        this._loadAreaTypes()
    }

    _loadAreaTypes = () => {
        this.services.getAreaList().then(areaItems => {
            const { areaTypes, areas } = areaItems
            console.log('state prime ' + JSON.stringify(areaItems))
            let firstType = areaTypes[0]
            this.setState({
                areaTypeList: areaTypes,
                areaList: areas,
                [ComponentId.areaType]: firstType ? firstType.id : ""
            })
        })
    }

    _onChange = event => {
        const { target: { name, value } } = event
        // console.log("testing --"+ JSON.stringify(name) +"  "+ JSON.stringify(value))
        if (name === ComponentId.newAreaType) {
            this.setState({
                currentType: value
            })
        } else {
            this.setState({
                [name]: value
            })

            console.log("testing --"+ JSON.stringify(this.state))
        }
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
            .then(areaTypeList => {
                this.setState({
                    areaTypeList: areaTypeList
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

    _deleteArea = (id) => {
        this.services
        .removeArea(id)
        .then(body => {
            const { areas, areaTypes } = body
            this.setState({
                areaTypeList: areaTypes,
                areaList: areas
            })
        })
    }

    _createArea = () => {
        const { idType, reference, mt2, priceMt2 } = this.state 
        this.services
        .createArea(idType, reference, mt2, priceMt2)
        .then(body => {
            const { areas, areaTypes } = body
            this.setState({
                areaTypeList: areaTypes,
                areaList: areas,
                [ComponentId.areaReference]: 0,
                [ComponentId.areaPriceMt2]: "",
                [ComponentId.areaMt2]: ""
            })
        })
    }

    render() {
        const { currentState, areaTypeList, areaList, idType, reference, mt2, priceMt2 } = this.state
        return (
            <div className="area-manager">
                <div className='create-area-type'>
                    {areaTypeList &&
                        <form>
                            {
                                areaTypeList.map(type => {
                                    return (
                                        <PrimeTypeItem
                                            key={type.id}
                                            remotePrimeType={this._deleteAreaType}
                                            primeTypeItem={type}
                                        />
                                    )
                                })
                            }
                        </form>
                    }
                    <div className='new-type'>
                        <div className='form-group'>
                            <label>Agregue el tipo de area</label>
                        </div>
                        <input type='text'
                         name={ComponentId.newAreaType}
                         onChange={this._onChange} 
                         />
                        <button onClick={this._createAreaType}>Agregar</button>
                    </div>
                </div>
                {areaTypeList.length > 0 &&
                    <div className='create-area'>
                        <div className='create-area-item'>
                            <div className='form-group'>
                                <label>Tipo</label>
                                <select
                                    className='area-type-list'
                                    name={ComponentId.areaType}
                                    value={idType}
                                    onChange={this._onChange}
                                >
                                    {areaTypeList.map(itemType => {
                                        return (
                                            <option key={itemType.id} value={itemType.id}>
                                                {itemType.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>Referencia</label>
                                <input type='number' name={ComponentId.areaReference} value={StringHelper.digits(reference)} onChange={this._onChange} />
                            </div>
                            <div className='form-group'>
                                <label>mt2</label>
                                <input type='number' name={ComponentId.areaMt2} value={StringHelper.digits(mt2)} onChange={this._onChange} />
                            </div>
                            <div className='form-group'>
                                <label>Valor mt2</label>
                                <input type='number' name={ComponentId.areaPriceMt2} value={StringHelper.digits(priceMt2)} onChange={this._onChange} />
                            </div>
                            <button onClick={() => this._createArea()}>Crear Area</button>
                        </div>
                        {areaList.length > 0 &&
                            <AreaListGrid
                                removeArea={this._deleteArea}
                                areaList={areaList}
                                areaTypeList={areaTypeList}
                            />
                        }
                    </div>
                }
                {areaTypeList.length <= 0 &&
                    <div className='should-create-type'>
                        <lable>Por favor cree almenos un tipo de area primero</lable>
                    </div>
                }
            </div>
        )
    }
}