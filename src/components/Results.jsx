import React, { Component } from 'react'
import { OperativeCashFlow } from './Results/OperativeCashFlow'
import { SalesReport } from './Results/SalesReport'

const TABS = {
  OPERATIVE_FLOW: 'OPERATIVE_FLOW',
  SALES: 'SALES'
}

class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: TABS.OPERATIVE_FLOW
    }
  }

  componentWillMount () {
    const { setTabs, setTitle } = this.props
    setTabs([
      {
        name: 'Flujo Operativo',
        id: TABS.OPERATIVE_FLOW,
        onClick: () => this._setTab(TABS.OPERATIVE_FLOW)
      },
      {
        name: 'Ventas',
        id: TABS.SALES,
        onClick: () => this._setTab(TABS.SALES)
      }
    ])
    setTitle('Resultados')
  }

  _setTab = tab => {
    this.setState({ tab })
  }

  render () {
    const { tab } = this.state
    const { results } = this.props
    if (!results) {
      return null
    }
    const {
      sales,
      directExpenses,
      indirectExpenses,
      operativeCashFlow,
      totalOperativeCashFlow
    } = results
    const { totalInstallments, cashFlow, totalCashFlow } = sales
    const { directExpensesCashflow, totalDirectExpensesCashflow } = directExpenses
    const {
      indirectExpensesCashflow,
      totalIndirectExpensesCashflow
    } = indirectExpenses

    return (
      <div className='results'>
        {tab === TABS.OPERATIVE_FLOW &&
          <OperativeCashFlow
            totalInstallments={totalInstallments}
            operativeCashFlow={operativeCashFlow}
            totalOperativeCashFlow={totalOperativeCashFlow}
            cashFlow={cashFlow}
            totalCashFlow={totalCashFlow}
            directExpensesCashflow={directExpensesCashflow}
            totalDirectExpensesCashflow={totalDirectExpensesCashflow}
            indirectExpensesCashflow={indirectExpensesCashflow}
            totalIndirectExpensesCashflow={totalIndirectExpensesCashflow}
          />}
        {tab === TABS.SALES && <SalesReport />}
      </div>
    )
  }
}

export default Results
