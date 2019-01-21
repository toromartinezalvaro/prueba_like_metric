import React, { Component } from 'react'

class Sales extends Component {
  _onChange = (event) => {
    const { onChange } = this.props
    event.formName = 'sales'
    onChange(event)
  }

  _getValues = (event) => {
    event.preventDefault()
    const { getResult } = this.props
    getResult(this.state)
  }

  render () {
    const {
      initialDate,
      units,
      breakeven,
      initialValue,
      valueIncrement,
      initialFee,
      separation,
      unitSalesPerPeriod,
      maxInstallments,
      constructionPeriodCount
    } = this.props

    return (
      <div className='input-form'>
        <form>
          <div className='form-group'>
            <label>Fecha Inicial de ventas</label>
            <input type='text' name='initialDate' value={initialDate} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>Unidades disponibles</label>
            <input type='number' name='units' value={units} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>Punto de equilibrio</label>
            <input type='number' name='breakeven' value={breakeven} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>Valor inicial de venta</label>
            <input type='number' name='initialValue' value={initialValue} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>% Incremento mensual sobre el valor de venta</label>
            <input type='number' name='valueIncrement' value={valueIncrement} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>% Cuota inicial</label>
            <input type='number' name='initialFee' value={initialFee} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>% Separación / total de la venta</label>
            <input type='number' name='separation' value={separation} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>Velocidad de ventas mes</label>
            <input type='number' name='unitSalesPerPeriod' value={unitSalesPerPeriod} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>Límite de pagos en cuota inicial</label>
            <input type='number' name='maxInstallments' value={maxInstallments} onChange={this._onChange} />
          </div>
          <div className='form-group'>
            <label>Meses de construcción</label>
            <input type='number' name='constructionPeriodCount' value={constructionPeriodCount} onChange={this._onChange} />
          </div>
        </form>
      </div>
    )
  }
}

export default Sales