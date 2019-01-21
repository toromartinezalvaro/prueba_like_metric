import React from 'react'
import ReactHighcharts from 'react-highcharts'

export const CashFlowGraph = ({
  totalInstallments,
  periodSales,
  cashFlow,
  indirectExpensesCashflow
}) => {
  const getHighchartsConfig = () => {
    const categories = []
    for (let i = 1; i <= totalInstallments; i++) {
      categories.push(i.toString())
    }

    return {
      title: {
        text: 'Flujos de caja'
      },
      xAxis: {
        categories
      },
      series: [
        {
          name: 'Ventas',
          data: periodSales.map(sales => Math.floor(sales))
        },
        {
          name: 'Flujo de caja ventas',
          data: cashFlow.map(amount => Math.floor(amount))
        },
        {
          name: 'Costos Indirectos',
          data: indirectExpensesCashflow.map(amount => Math.floor(amount))
        }
      ]
    }
  }

  return (
    <div className='charts'>
      <ReactHighcharts config={getHighchartsConfig()} />
    </div>
  )
}