import React, { Component } from 'react'
import Icon from '../../Icon'

const ITEM_TYPES = [
  {
    name: 'Edificación',
    value: 'building'
  },
  {
    name: 'Parqueaderos',
    value: 'parking_lot'
  },
  {
    name: 'Urbanismo',
    value: 'city_planning'
  }
]

class ExpenseDetails extends Component {
  constructor (props) {
    super(props)
    const {
      item,
      unitValue,
      valueDate,
      totalUnits,
      valueIncrement,
      constructionStartDate,
      constructionPeriodCount
    } = props

    this.state = {
      item: item || ITEM_TYPES[0].value,
      unitValue: unitValue || 1600,
      valueDate: valueDate || '2018-03-01',
      totalUnits: totalUnits || 6000,
      valueIncrement: valueIncrement || 5,
      constructionStartDate: constructionStartDate || '2019-03-01',
      constructionPeriodCount: constructionPeriodCount || 18
    }
  }

  componentWillMount () {
    const { index, onChange } = this.props
    onChange(index, this.state)
  }

  _onChange = event => {
    const { target: { name, value } } = event
    const nextState = {
      ...this.state,
      [name]: value
    }

    // Convert percentages
    // if (name === 'valueIncrement' && !isNaN(nextState.valueIncrement)) {
    //   nextState.valueIncrement /= 100
    // }

    this.setState(nextState, () => {
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
      unitValue,
      valueDate,
      totalUnits,
      valueIncrement,
      constructionStartDate,
      constructionPeriodCount
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
            <label>Rubro</label>
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
            <label>Valor m2</label>
            <input
              type='number'
              name='unitValue'
              value={unitValue}
              onChange={this._onChange}
            />
          </div>
          <div className='form-group'>
            <label>Fecha del tenor por m2</label>
            <input
              type='text'
              name='valueDate'
              value={valueDate}
              onChange={this._onChange}
            />
          </div>
          <div className='form-group'>
            <label>Total construido (m2)</label>
            <input
              type='number'
              name='totalUnits'
              value={totalUnits}
              onChange={this._onChange}
            />
          </div>
          <div className='form-group'>
            <label>Indexación del costo E.M. (%)</label>
            <input
              type='number'
              name='valueIncrement'
              value={valueIncrement}
              onChange={this._onChange}
            />
          </div>
          <div className='form-group'>
            <label>Fecha de inicio de construcción</label>
            <input
              type='text'
              name='constructionStartDate'
              value={constructionStartDate}
              onChange={this._onChange}
            />
          </div>
          <div className='form-group'>
            <label># Meses para construcción</label>
            <input
              type='number'
              name='constructionPeriodCount'
              value={constructionPeriodCount}
              onChange={this._onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ExpenseDetails
