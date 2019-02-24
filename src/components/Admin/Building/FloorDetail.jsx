import React, { Component } from 'react'
import Icon from '../../Icon'
import StringHelper from './../../../Helpers/StringHelper'


class FloorDetail extends Component {
    constructor(props) {
        super(props)
        const {
            locations,
            typologies,
            floorItem
        } = props

        this.state = {
            currentTypology: typologies[0].id,
            currentLocation: locations[0].id,
            currentApartmentNumber: floorItem.reference * 101
        }
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

    _areaReferences(areaList, idType) {
        let areas = areaList.filter(area => {
            return area.idType === idType
        })
        console.log("references" + JSON.stringify(areas))
        return areas.map(area => { return area.reference })
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
        return ["Numero apto", "Tipo", "Ubicación"]
    }

    _itemByPorperty(description, name) {
        return (<div className={"item " + name}>
            <label >
                {
                    description
                }
            </label>
        </div>)
    }

    _itemsByProperty(property, typologies, primeList) {
        let propertyType = typologies.find(type => {
            return type.id == property.type
        })

        let locationPrime = primeList.find(prime => {
            return prime.id == property.locationId
        })

        return [
            this._itemByPorperty(property.number, "number"),
            this._itemByPorperty(propertyType.name, "type"),
            this._itemByPorperty(StringHelper.digits(locationPrime.priceMT2), "locationMt2")
        ]
    }

    _addProperty = () => {
        const { floorItem, primeList, locations, addProperty} = this.props
        const { currentApartmentNumber, currentTypology, currentLocation } = this.state

        let newProperty = {
            number: currentApartmentNumber,
            type: currentTypology,
            locationId: currentLocation,
            isNew: true
        }

        addProperty(floorItem.floorId, newProperty)
    }

    render() {
        const {
            floorItem,
            typologies,
            locations,
            primeList
        } = this.props

        const {
            currentTypology,
            currentApartmentNumber,
            currentLocation
        } = this.state

        return (
            <div className='form-container'>
                <div className='form-row'>


                    <div className='add-area'>

                        <div className='form-group'>
                            <h3>
                                {
                                    "Piso numero " + floorItem.reference
                                }
                            </h3>
                        </div>

                        <div className='form-group'>
                            <label>Agregue el numero del apartamento</label>
                            <input type='number' name='currentApartmentNumber' value={currentApartmentNumber} onChange={this._onChange} />
                        </div>

                        <div className='form-group'>
                            <label>Seleccionar el tipo</label>
                            <select
                                name='currentTypology'
                                id='currentTypology'
                                value={currentTypology}
                                onChange={this._onChange}
                            >
                                {typologies.map(type => {
                                    return (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className='form-group'>
                            <label>Seleccionar ubicación</label>
                            <select
                                name='currentLocation'
                                id='currentLocation'
                                value={currentLocation}
                                onChange={this._onChange}
                            >
                                {
                                    locations.map(location => {
                                        return (
                                            <option key={location.id} value={location.id}>
                                                { location.reference + "  ( $"+ location.priceMT2 +" ) " }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='submit-form'>
                            <button onClick={this._addProperty}>Agregar</button>
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
                        {
                            floorItem.properties.length > 0 &&
                            floorItem.properties.flatMap(property => {
                                return this._itemsByProperty(property, typologies, primeList)
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default FloorDetail

