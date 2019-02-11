import React, { Component } from 'react'
import Icon from '../../Icon'


export default class PrimeTypeItem extends Component {
    constructor(props) {
        super(props)
        const { primeTypeItem } = props
        this.state = {
            primeTypeItem: primeTypeItem
        }
    }

    render() {
        const { primeTypeItem } = this.state
        const { remotePrimeType } = this.props
        if (!primeTypeItem) {
            return null
        }

        const { id, name } = primeTypeItem

        return (
            <div className='item'>
                <div className="label-container">
                    <label>{name}</label>
                </div>
                <div className='close' onClick={() => remotePrimeType(id)}>
                    <Icon name='close' />
                </div>
            </div>
        )
    }
}