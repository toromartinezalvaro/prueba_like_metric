import React, { Component } from 'react'
import Sales from './InputForm/Sales'
import DirectExpenses from './InputForm/DirectExpenses/DirectExpenses'
import IndirectExpenses from './InputForm/IndirectExpenses/IndirectExpenses'

const TABS = {
  SALES: 'SALES',
  DIRECT_EXPENSES: 'DIRECT_EXPENSES',
  INDIRECT_EXPENSES: 'INDIRECT_EXPENSES'
}
class InputForm extends Component {
  constructor (props) {
    super(props)
    const { inputFormData } = this.props
    if (inputFormData) {
      this.state = {
        ...inputFormData,
        tab: TABS.SALES
      }
      return
    }
    this.state = {
      tab: TABS.SALES,
      sales: {
        initialDate: '01/01/2018',
        units: 75,
        breakeven: 60,
        initialValue: 200000,
        valueIncrement: 0.5,
        initialFee: 30,
        separation: 5,
        unitSalesPerPeriod: 4,
        maxInstallments: 36,
        constructionPeriodCount: 18
      },
      directExpenses: {
        expenses: []
      },
      indirectExpenses: {
        expenses: []
      }
    }
  }

  componentWillMount () {
    const { setTabs, setTitle } = this.props
    setTabs([
      {
        name: 'Ventas',
        id: TABS.SALES,
        onClick: () => this._setTab(TABS.SALES)
      },
      {
        name: 'Costos Directos',
        id: TABS.DIRECT_EXPENSES,
        onClick: () => this._setTab(TABS.DIRECT_EXPENSES)
      },
      {
        name: 'Costos Indirectos',
        id: TABS.INDIRECT_EXPENSES,
        onClick: () => this._setTab(TABS.INDIRECT_EXPENSES)
      }
    ])
    setTitle('Ingreso de Datos')
  }

  _setTab = tab => {
    this.setState({
      tab
    })
  }

  _onChange = event => {
    const { formName, target: { name, value } } = event
    if (!formName) {
      return
    }
    const currentFormState = this.state[formName] || {}

    this.setState({
      [formName]: {
        ...currentFormState,
        [name]: value
      }
    }, () => {
      const { onChange } = this.props
      onChange(this.state)
    })
  }

  _getValues = event => {
    event.preventDefault()
    const { getResult } = this.props
    getResult(this.state)
  }

  render () {
    const { tab, sales, directExpenses, indirectExpenses } = this.state

    return (
      <div>
        {tab === TABS.SALES && <Sales onChange={this._onChange} {...sales} />}
        {tab === TABS.DIRECT_EXPENSES &&
          <DirectExpenses
            onChange={this._onChange}
            expenses={directExpenses && directExpenses.expenses}
          />}
        {tab === TABS.INDIRECT_EXPENSES &&
          <IndirectExpenses
            onChange={this._onChange}
            expenses={indirectExpenses && indirectExpenses.expenses}
          />}
        <div className='submit-form'>
          <button onClick={this._getValues}>Simular</button>
        </div>
      </div>
    )
  }
}

export default InputForm
