import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


export default class EditingItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // const { types } = this.state
        const { onSelect, onChange, types } = this.props

        if (!types) {
            return null
        }

        let names = types.map(type => {
            return type.name
        })

        return (
            <div>
                <div className=''>
                { 
                    names &&
                    <Dropdown options={names} onChange={onChange} placeholder="Seleccionar un tipo" />
                }

                <label>Referencia</label>
                <input type='text' name="reference" onChange={onChange} />
                <label>precio mt2</label>
                <input type='text' name="priceMT2" onChange={onChange} />
                <label>precio total</label>
                <input type='text' name="totalPrice" onChange={onChange} />
                <button className='delete-button' >Crear Prima</button>
                </div>
            </div>
        )
    }
}