import React, { Component } from 'react'
import Icon from '../../Icon'

const ITEM_TYPES = [
  {
    name: 'Estudio de títulos',
    value: 'titles_study'
  },
  {
    name: 'Trámites ambientales',
    value: 'environmental_procedures'
  },
  {
    name: 'Topografía preliminar',
    value: 'preliminary_topography'
  }
]

const MEASUREMENT_UNITS = [
  {
    name: 'unidades',
    value: 'uds'
  },
  {
    name: 'm2',
    value: 'm2'
  },
  {
    name: 'm3',
    value: 'm3'
  },
  {
    name: 'litros',
    value: 'lt'
  }
]

class ExpenseDetails extends Component {
  constructor (props) {
    super(props)
    const {
      item,
      quantity,
      measurementUnit,
      unitValue,
      total,
      tax,
      totalWithTax,
      presalesPercentage,
      constructionPercentage,
      postsalesPercentage,
      presalesTotal,
      constructionTotal,
      postsalesTotal
    } = props

    this.state = {
      item: item || ITEM_TYPES[0].value,
      quantity: quantity || 1,
      measurementUnit: measurementUnit || MEASUREMENT_UNITS[0].value,
      unitValue: unitValue || 0,
      total: total || 0,
      tax: tax || 19,
      totalWithTax: totalWithTax || 0,
      presalesPercentage: presalesPercentage || 100,
      constructionPercentage: constructionPercentage || 0,
      postsalesPercentage: postsalesPercentage || 0,
      presalesTotal: presalesTotal || 0,
      constructionTotal: constructionTotal || 0,
      postsalesTotal: postsalesTotal || 0
    }
  }

  componentWillMount () {
    const { index, onChange } = this.props
    onChange(index, this.state)
  }

  _calculateTotals = nextState => {
    const {
      quantity,
      unitValue,
      tax,
      presalesPercentage,
      constructionPercentage,
      postsalesPercentage
    } = nextState

    const total = +quantity * +unitValue
    const totalWithTax = total * (1 + (+tax / 100))
    const presalesTotal = totalWithTax * (+presalesPercentage / 100)
    const constructionTotal = totalWithTax * (+constructionPercentage / 100)
    const postsalesTotal = totalWithTax * (+postsalesPercentage / 100)

    return {
      total,
      totalWithTax,
      presalesTotal,
      constructionTotal,
      postsalesTotal
    }
  }

  _onChange = event => {
    const { target: { name, value } } = event
    const nextState = {
      ...this.state,
      [name]: value
    }
    const totals = this._calculateTotals(nextState)
    this.setState({
        ...nextState,
        ...totals
      }, () => {
      const { index, onChange } = this.props
      onChange(index, this.state)
    })
  }

  _remove = () => {
    const { index, remove } = this.props
    remove(index)
  }

  render () {
    const {
      item,
      quantity,
      measurementUnit,
      unitValue,
      total,
      tax,
      totalWithTax,
      presalesPercentage,
      constructionPercentage,
      postsalesPercentage,
      presalesTotal,
      constructionTotal,
      postsalesTotal
    } = this.state

    return (
      <div className='form-container'>
        <div className='form-controls'>
          <div className='close' onClick={this._remove}>
            <Icon name='close' />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label>Item</label>
            <select
              name='item'
              id='item'
              value={item}
              onChange={this._onChange}
            >
              {ITEM_TYPES.map(itemType => {
                return (
                  <option key={itemType.id} value={itemType.id}>
                    {itemType.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Cantidad</label>
            <input
              type='number'
              name='quantity'
              value={quantity}
              onChange={this._onChange}
            />
          </div>
          <div className='form-group'>
            <label>Unidad de medida</label>
            <select
              name='measurementUnit'
              id='measurementUnit'
              value={measurementUnit}
              onChange={this._onChange}
            >
              {MEASUREMENT_UNITS.map(unit => {
                return (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                )
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Valor unidad</label>
            <input
              type='number'
              name='unitValue'
              onChange={this._onChange}
              value={unitValue}
            />
          </div>
          <div className='form-group'>
            <label>Total</label>
            <input
              type='number'
              name='total'
              onChange={this._onChange}
              value={total}
              disabled
            />
          </div>
          <div className='form-group'>
            <label>IVA</label>
            <input
              type='number'
              name='tax'
              onChange={this._onChange}
              value={tax}
            />
          </div>
          <div className='form-group'>
            <label>Total con IVA</label>
            <input
              type='number'
              name='totalWithTax'
              onChange={this._onChange}
              value={totalWithTax}
              disabled
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label>% Ejecutado en Preventa</label>
            <input
              type='number'
              name='presalesPercentage'
              onChange={this._onChange}
              value={presalesPercentage}
            />
          </div>
          <div className='form-group'>
            <label>% Ejecutado en Construcción</label>
            <input
              type='number'
              name='constructionPercentage'
              onChange={this._onChange}
              value={constructionPercentage}
            />
          </div>
          <div className='form-group'>
            <label>% Ejecutado en Liquidación</label>
            <input
              type='number'
              name='postsalesPercentage'
              onChange={this._onChange}
              value={postsalesPercentage}
            />
          </div>
          <div className='form-group'>
            <label>Total Preventa</label>
            <input
              type='number'
              name='presalesTotal'
              onChange={this._onChange}
              value={presalesTotal}
              disabled
            />
          </div>
          <div className='form-group'>
            <label>Total Construcción</label>
            <input
              type='number'
              name='constructionTotal'
              onChange={this._onChange}
              value={constructionTotal}
              disabled
            />
          </div>
          <div className='form-group'>
            <label>Total Liquidación</label>
            <input
              type='number'
              name='postsalesTotal'
              onChange={this._onChange}
              value={postsalesTotal}
              disabled
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ExpenseDetails
