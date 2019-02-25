import React, { Component } from 'react'
import Services from '../../../webapi/services'
import FloorDetail from './FloorDetail'
import Icon from './../../Icon'
import { PrimeTypes } from './../Prime/CreatePrime'


export default class CreateBuilding extends Component {

    constructor(props) {
        super(props)
        this.services = new Services()
        this.state = {
            typologies: [],
            towerList: [],
            primeList: []
        }
    }

    componentWillMount() {
        this.loadTowersInfo()
    }

    loadTowersInfo() {
        this.services.getProperties().then(info => {
            this._setStateWithInfo(info)
            // this._setCustomId(info)
        })
    }

    _setStateWithInfo = (info) => {
        const { towerList, propertyTypologies, primeList } = info

        // let typologies = [...propertyTypologies, ...newTypologies]

        this.setState({
            towerList: towerList,
            typologies: propertyTypologies,
            primeList: primeList
        })
    }

    // _setCustomId = (info) => {
    //     const { propertyTypologies } = info
    //     if (propertyTypologies.length <= 0) {
    //         return
    //     }

    //     let customId = propertyTypologies.reduce((previous, current) => {
    //         return previous + current.id
    //     })
    //     this.setState({
    //         customId: customId
    //     })
    // }

    // _add = (typologies) => {
    //     const { customId, newTypologies } = this.state
    //     var mutableTypologies = typologies
    //     let nextIndex = Math.max(typologies.length, 1)

    //     let lastType = typologies[nextIndex - 1]
    //     if (lastType && lastType.isNew && lastType.areas.length <= 0) {
    //         alert("Primero agrega areas al tipo de inmueble recien creado")
    //         return
    //     }

    //     let newId = nextIndex + customId

    //     let newTypology = {
    //         id: newId,
    //         name: "Inmueble TIPO " + nextIndex,
    //         areas: [],
    //         isNew: true
    //     }

    //     mutableTypologies.push(newTypology)
    //     newTypologies.push(newTypology)
    //     this.setState({
    //         typologies: mutableTypologies,
    //         customId: newId,
    //         newTypologies: newTypologies
    //     })
    // }

    _remove() {

    }

    _addProperty = (floorId, newProperty) => {
        const { towerList } = this.state
        var floorList = towerList
        var floorIndex = towerList.findIndex(floor => { return floor.floorId == floorId })
        var floor = towerList[floorIndex]
        floor.properties.push(newProperty)
        floorList[floorIndex] = floor
        this.setState({
            towerList: floorList
        })
        this._saveProperty(newProperty)
    }

    _saveProperty(newProperty) {
        this.services.createProperties(newProperty).then(info => {
            this._setStateWithInfo(info)
        })
    }

    _saveAll = () => {
        // const { typologies } = this.state
        // this.services.createPropertyTypology(typologies).then(info => {
        //     this.setState({
        //         newTypologies: []
        //     })
        //     this._setStateWithInfo(info)
        // })
    }

    _removeApartment = (typology) => {
        // const { typologies } = this.state
        // if (window.confirm("Desea eliminar este tipo?")) {
        //     if (!typology.isNew) {
        //         this.services.removePropertyTypology(typology.id).then(this._setStateWithInfo)
        //     }
        //     var filteredTypologies = typologies.filter(type => {
        //         return type.id !== typology.id
        //     })
        //     this.setState({
        //         typologies: filteredTypologies
        //     })
        // }
    }

    render() {
        const { typologies, primeList, towerList } = this.state

        let locations = primeList.filter(prime => {
            return prime.idType == PrimeTypes.location
        })

        return (
            <div className='create-building'>
                {
                towerList.filter(prime => {
                    return prime.typeId == PrimeTypes.floor
                }).map(floor => {
                    return (
                        <FloorDetail
                            primeList={primeList}
                            floorItem={floor}
                            typologies={typologies}
                            locations={locations}
                            addProperty={this._addProperty}
                            removeApartment={this._removeApartment}
                        />
                    )
                })
                }
                {/* <div className='add-row'>
                    <div className='add-button' onClick={() => this._add(typologies)}>
                        <Icon name='add' />
                    </div>
                </div> */}
            </div>
        )
    }
}