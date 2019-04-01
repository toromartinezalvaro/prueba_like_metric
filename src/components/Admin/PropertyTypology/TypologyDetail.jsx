import React, { Component } from 'react'
import Icon from '../../Icon'
import StringHelper from './../../../Helpers/StringHelper'


class TypologyDetail extends Component {
    constructor(props) {
        super(props)
        const {
            areaList,
            typeList
        } = props


        let areaType = typeList[0]
        if (!areaType) {
            this.state = {
                currentAreaType: null,
                currentAreaReference: null
            }
            return
        }
        let referenceByType = this._areasReferences(areaList, areaType.id)[0]

        this.state = {
            currentAreaType: areaType.id,
            currentAreaReference: referenceByType ? referenceByType.reference : ""
        }
    }

    componentWillMount() {
        // const { index, onChange } = this.props
        // onChange(index, this.state)
    }

    _onChange = event => {
        const { target: { name, value } } = event
        console.log("testing --" + JSON.stringify(name) + "  " + JSON.stringify(value))
        this.setState({
            [name]: value
        })

        console.log("testing --" + JSON.stringify(this.state))
        // this.setState(nextState, () => {
        //   const { index, onChange } = this.props
        //   onChange(index, this.state)
        // })
    }

    _areasReferences(areaList, idType) {
        let areas = areaList.filter(area => {
            return area.idType === idType
        })

        console.log("testing --" + JSON.stringify(areas))
        return areas
        // return areas.map(area => { return area.reference })
    }

    _areaByReferenceAndType(areaList, idType, reference) {
        return areaList.find(area => {
            return area.reference === reference && area.idType === idType
        })
    }

    _removeProperty = () => {
        const { removeProperty, currentTypology } = this.props
        removeProperty(currentTypology)
    }


    _headers() {
        return ["", "Referencia", "Area mt2", "Valor mt2", "Valor Total"]
    }

    _itemByArea(description, name) {
        return (<div className={"item " + name}>
            <label >
                {
                    description
                }
            </label>
        </div>)
    }

    _itemsByArea(area) {
        let totalPrice = (parseFloat(area.areaPriceMt2) * parseFloat(area.areaMt2))
        return [
            this._itemByArea(area.areaTypeName, "areaTypeName"),
            this._itemByArea(area.areaReference, "areaReference"),
            this._itemByArea(StringHelper.digits(area.areaMt2), "areaMt2"),
            this._itemByArea(StringHelper.digits(area.areaPriceMt2), "areaPriceMt2"),
            this._itemByArea("$" + StringHelper.digits(totalPrice), "totalPrice")
        ]
    }

    _totalPriceByAreas(areas) {
        if (areas.length <= 1) {
            return []
        }

        let totalPrice = areas.reduce((total, area) => {
            return (parseFloat(area.areaPriceMt2) * parseFloat(area.areaMt2)) + total
        }, 0)
        return [
            this._itemByArea("", "helper"),
            this._itemByArea("", "helper"),
            this._itemByArea("", "helper"),
            this._itemByArea("", "helper"),
            this._itemByArea("Total: $" + StringHelper.digits(totalPrice), "totalPrice")
        ]
    }

    _addArea = () => {
        const { currentTypology, typeList, areaList, addArea } = this.props
        const { currentAreaType, currentAreaReference } = this.state

        let type = typeList.find(type => { return type.id === currentAreaType })
        let area = areaList.find(area => {
            return area.reference === currentAreaReference && area.idType === currentAreaType
        })
        if (currentAreaReference.length <= 0 || currentAreaType.length <= 0 || !area) {
            alert("Primero selecciona un tipo de area y una referencia")
            return
        }

        let newArea = {
            areaId: area.id,
            areaTypeId: type.id,
            areaTypeName: type.name,
            areaReference: currentAreaReference,
            areaMt2: area.mt2,
            isNew: true,
            areaPriceMt2: area.priceMt2
        }
        addArea(currentTypology.id, newArea)
    }

    render() {
        const {
            currentTypology,
            typeList,
            areaList
        } = this.props

        const {
            currentAreaType,
            currentAreaReference
        } = this.state

        return (
            <div className='form-container'>
                <div className='form-controls'>
                    <div className='close' onClick={this._removeProperty}>
                        <Icon name='close' />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='add-area'>
                        <div className='form-group'>
                            <label>{currentTypology.name}</label>
                        </div>
                        <div className='form-group'>
                            <label>Seleccionar el tipo</label>
                            <select
                                name='currentAreaType'
                                id='currentAreaType'
                                value={currentAreaType}
                                onChange={this._onChange}
                            >
                                {typeList.map(itemType => {
                                    return (
                                        <option key={itemType.id} value={itemType.id}>
                                            {itemType.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label>Seleccionar Referencia</label>
                            <select
                                name='currentAreaReference'
                                id='currentAreaReference'
                                value={currentAreaReference}
                                onChange={this._onChange}
                            >
                                {
                                    this._areasReferences(areaList, currentAreaType).map(area => {
                                        return (
                                            <option key={area.id} value={area.reference}>
                                                {area.reference + " " + "( $" + area.priceMt2 + " )"}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='submit-form'>
                            <button onClick={this._addArea}>Agregar</button>
                        </div>
                    </div>
                    <div className='property-list'>
                        {
                            this._headers().map(header => {
                                return (
                                    <div
                                        key={header}
                                        className={header.length > 0 ? "header" : "helper"
                                        }>
                                        <label>
                                            {
                                                header
                                            }
                                        </label>
                                    </div>)
                            })
                        }
                        {!currentTypology.areas.isEmpty &&
                            [
                                ...currentTypology.areas.flatMap(area => {
                                    return this._itemsByArea(area)
                                }),
                                ...this._totalPriceByAreas(currentTypology.areas)
                            ]
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default TypologyDetail
