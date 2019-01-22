import React, { Component } from 'react'
import Services from '../../../webapi/services'
import TypologyDetail from './TypologyDetail'
import Icon from './../../Icon'


export default class PropertyTypology extends Component {

  constructor(props) {
    super(props)
    this.services = new Services()
    this.state = {
      typologies: [],
      newTypologies: [],
      areaTypes: [],
      areaList: [],
      areas: [],
      customId: 0
    }
  }

  componentWillMount() {
    this.loadTypologies()
  }

  loadTypologies() {
    this.services.getPropertyTypology().then(info => {
      this._setStateWithInfo(info)
      this._setCustomId(info)
    })
  }

  _setStateWithInfo = (info) => {
    const { newTypologies } = this.state
    const { areaTypes, propertyTypologies, areas } = info

    let typologies = [...propertyTypologies, ...newTypologies]

    this.setState({
      typologies: typologies,
      areaTypes: areaTypes,
      areaList: areas
    })

    if(typologies.length <= 0) {
      this._add(typologies)
    }
  }

  _setCustomId = (info) => {
    const { propertyTypologies } = info
    if(propertyTypologies.length <= 0) {
      return
    }

    let customId = propertyTypologies.reduce((previous, current) => {
      return previous + current.id
    })
    this.setState({
      customId: customId
    })
  }

  _add = (typologies) => {
    const { customId, newTypologies } = this.state
    var mutableTypologies = typologies
    let nextIndex = Math.max(typologies.length, 1)

    let lastType = typologies[nextIndex - 1]
    if (lastType && lastType.isNew) {
      alert("Primero agrega areas al tipo de inmueble recien creado")
      return
    }

    let newId = nextIndex + customId

    let newTypology = {
      id: newId,
      name: "Inmueble TIPO " + nextIndex,
      areas: [],
      isNew: true
    }

    mutableTypologies.push(newTypology)
    newTypologies.push(newTypology)
    this.setState({
      typologies: mutableTypologies,
      customId: newId,
      newTypologies: newTypologies
    })
  }

  _remove() {

  }

  _addArea = (currentTypologyId, newArea) => {
    const { typologies } = this.state
    var mutableTypologies = typologies
    var typologyIndex = typologies.findIndex(type => { return type.id === currentTypologyId })
    var typology = typologies[typologyIndex]
    typology.areas.push(newArea)
    mutableTypologies[typologyIndex] = typology
    this.setState({
      typologies: mutableTypologies
    })
  }

  _saveAll = () => {
    const { typologies } = this.state
    this.services.createPropertyTypology(typologies).then(info =>{
      this.setState({
        newTypologies: []
      })
      this._setStateWithInfo(info)
    })
  }

  _removeProperty = (typology) => {
    const { typologies } = this.state
    if (window.confirm("Desea eliminar este tipo?")) {
      if (!typology.isNew) {
        this.services.removePropertyTypology(typology.id).then(this._setStateWithInfo)
      }
      var filteredTypologies = typologies.filter(type => {
        return type.id !== typology.id
      })
      this.setState({
        typologies: filteredTypologies
      })
    }
  }

  render() {
    const { typologies, areaTypes, areaList } = this.state
    return (
      <div className='property-typology'>
        {typologies.map((type, index) => {
          return (
            <TypologyDetail
              index={type.id === null ? index : type.id}
              currentTypology={type}
              typeList={areaTypes}
              areaList={areaList}
              addArea={this._addArea}
              removeProperty={this._removeProperty}
            />
          )
        })}
        <div className='add-row'>
          <div className='add-button' onClick={() => this._add(typologies)}>
            <Icon name='add' />
          </div>
        </div>
        <div className='submit-form'>
          <button onClick={this._saveAll}>Guardar todo</button>
        </div>
      </div>
    )
  }
}