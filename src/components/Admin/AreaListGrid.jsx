import React, { Component } from 'react'
import Icon from '../Icon'
import StringHelper from './../../Helpers/StringHelper'


export default class AreaListGrid extends Component {

    constructor(props) {
        super(props)
    }

    _onChange = event => {
        const { target: { name, value } } = event
        this.setState({
            currentPrime: value
        })
    }

    _newPrime = () => {

    }

    _createPrime = () => {
    }

    getHeaders = () => {
        return ["Tipo", "Referencia", "Mt2", "Valor mt2", ""]
    }

    itemsByArea(area, areaTypeList, removeArea) {
        return [
            <div className="item">
                <label >
                    {
                        areaTypeList.find(type => {
                            return type.id === area.idType
                        }).name
                    }
                </label>
            </div>,

            <div className="item">
                <label >
                    {area.reference}
                </label>
            </div>,

            <div className="item">
                <label >
                    {StringHelper.digits(area.mt2)}
                </label>
            </div>,

            <div className="item">
                <label >
                    {StringHelper.digits(area.priceMt2)}
                </label>
            </div>,

            <div className='close' onClick={() => removeArea(area.id)}>
                <Icon name='close' />
            </div>
        ]
    }

    render() {
        const { removeArea, areaList, areaTypeList } = this.props
        return (
            <div className="area-list">
                {
                    this.getHeaders().map(header => {
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
                    areaList.flatMap(area => {
                        return this.itemsByArea(area, areaTypeList, removeArea)
                    })
                }
                {/* <div className='submit-form'>
                    <button onClick={this._newPrime}>Nueva Prima</button>
                </div> */}
            </div>
        )
    }
}