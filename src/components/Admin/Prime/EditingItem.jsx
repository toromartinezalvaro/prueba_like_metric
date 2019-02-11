import React, { Component } from 'react'

export default class EditingItem extends Component {

    render() {
        const { onSelect, onChange, currentEditingIndex, primeList, currentEditingValue, idEditingIndex, idEditingValue, primeTypeId } = this.props

        return (
            <div className='edit-prime-item'>
                <div className='form-group'>
                    <label>Seleccionar indice</label>
                    <select
                        name={idEditingIndex}
                        id={idEditingIndex}
                        value={currentEditingIndex}
                        onChange={onChange}
                    >
                        {primeList.filter(prime => {
                            return prime.idType == primeTypeId 
                        }).map(prime => {
                            return (
                                <option key={prime.id} value={prime.id}>
                                    {prime.reference}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Valor mt2</label>
                    <input type='number' name={idEditingValue} value={currentEditingValue} onChange={onChange} />
                </div>
                <button className='submit-form' onClick={onSelect}>Agregar precio</button>
            </div>
        )
    }
}