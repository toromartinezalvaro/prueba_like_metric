import React, { Component } from 'react'
import Services from '../../webapi/services'
import PrimeTypeItem from './Prime/PrimeTypeItem'
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
            this._setupArea(areaItems)
        }).catch(err => {
            console.log("error -->" + err)
        });
    }
    
    _setupArea = (areaItems) => {
        const { areaTypes, areas } = areaItems
        const { idType } = this.state
        let firstType = areaTypes[0]
        let typeId = idType.length > 0 ? idType : (firstType ? firstType.id : "")
        this.setState({
            areaTypeList: areaTypes,
            areaList: areas,
            [ComponentId.areaType]: typeId,
            [ComponentId.areaPriceMt2]: "",
            [ComponentId.areaMt2]: ""
        })
    
        this._setupReference(typeId, areas)
        this.refs.mt2Input.select()
    }

    _onChange = event => {
        const { target: { name, value } } = event
        const { areaTypeList, areaList } = this.state
        // console.log("testing --"+ JSON.stringify(name) +"  "+ JSON.stringify(value))
        if (name === ComponentId.newAreaType) {
            this.setState({
                currentType: value
            })
        } else {
            this.setState({
                [name]: value
            })
        }

        if (name === ComponentId.areaType) {
            this._setupReference(value, areaList)
        }
    }

    _setupReference = (typeId, areaList) => {
        let maxReference = areaList.reduce((maxReference, area) => {
            if (area.idType == typeId) {
                let reference = parseInt(area.reference) + 1
                return reference > maxReference ? reference : maxReference
            }
            return maxReference
        }, 1)
        
        this.setState({
            reference: maxReference
        })
    }

    _newAreaType = () => {
        this.setState({
            currentState: STATES.NEW_AREA_TYPE
        })
    }

    _createAreaType = () => {
        const { currentType, areaTypeList } = this.state

        if (!currentType || currentType.length <= 0) {
            alert("Por favor escriba algo en el campo de texto para luego continuar guardando");
            return 
        }

        this.services
            .createAreaType(currentType)
            .then(areaTypeList => {
                let firstType = areaTypeList[0]
                this.setState({
                    areaTypeList: areaTypeList,
                    [ComponentId.areaType]: firstType ? firstType.id : ""
                })
                this._loadAreaTypes()
            })
    }

    _deleteAreaType = (id) => {
        if (window.confirm("Desea eliminar este tipo de area? \n tenga en cuenta que eliminaría todas las areas asociadas a este tipo")) {
            this.services.removeAreaType(id)
            const { areaTypeList } = this.state
    
            var typeFiltered = areaTypeList.filter(type => {
                return type.id !== id
            })
    
            let firstType = areaTypeList[0]
            this.setState({
                areaTypeList: typeFiltered,
                [ComponentId.areaType]: firstType ? firstType.id : ""
            })
        }
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
            if (body) {
                this._setupArea(body)
            }
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
                                <input type='number' name={ComponentId.areaReference} value={reference} onChange={this._onChange}/>
                            </div>
                            <div className='form-group'>
                                <label>mt2</label>
                                <input type='number' name={ComponentId.areaMt2} value={StringHelper.digits(mt2)} onChange={this._onChange} ref='mt2Input'/>
                            </div>
                            <div className='form-group'>
                                <label>Valor mt2</label>
                                <input type='number' name={ComponentId.areaPriceMt2} value={StringHelper.digits(priceMt2)} onChange={this._onChange} />
                            </div>
                            <button onClick={() => this._createArea()}>Crear Area</button>
                        </div>
                        {areaList.length > 0 && areaTypeList.length > 0 &&
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