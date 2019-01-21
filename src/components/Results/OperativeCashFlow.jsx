import React from 'react'
import formatCurrency from 'format-currency'

const CURRENCY_OPTIONS = {
  format: '%s%v',
  symbol: '$'
}

export const OperativeCashFlow = ({
  totalInstallments,
  operativeCashFlow,
  totalOperativeCashFlow,
  cashFlow,
  totalCashFlow,
  directExpensesCashflow,
  totalDirectExpensesCashflow,
  indirectExpensesCashflow,
  totalIndirectExpensesCashflow
}) => {
  let keyCounter = 0
  const getTableHeaderCells = () => {
    const elements = []
    for (let i = 1; i <= totalInstallments; i++) {
      elements.push(<td key={++keyCounter}>{i}</td>)
    }
    elements.push(<td key={++keyCounter}>Total</td>)
    return elements
  }

  return (
    <div className='cash-flow'>
      <table>
        <thead>
          <tr>
            <td />
            {getTableHeaderCells()}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flujo operativo</td>
            {operativeCashFlow.map(periodAmount => {
              return (
                <td key={++keyCounter}>
                  {formatCurrency(periodAmount, CURRENCY_OPTIONS)}
                </td>
              )
            })}
            <td>{formatCurrency(totalOperativeCashFlow, CURRENCY_OPTIONS)}</td>
          </tr>
          <tr>
            <td>Flujo ventas</td>
            {cashFlow.map(amount => {
              return (
                <td key={++keyCounter}>
                  {formatCurrency(amount, CURRENCY_OPTIONS)}
                </td>
              )
            })}
            <td>{formatCurrency(totalCashFlow, CURRENCY_OPTIONS)}</td>
          </tr>
          <tr>
            <td>Costos Directos</td>
            {directExpensesCashflow.map(amount => {
              return (
                <td key={++keyCounter}>
                  {formatCurrency(amount, CURRENCY_OPTIONS)}
                </td>
              )
            })}
            <td>
              {formatCurrency(totalDirectExpensesCashflow, CURRENCY_OPTIONS)}
            </td>
          </tr>
          <tr>
            <td>Costos Indirectos</td>
            {indirectExpensesCashflow.map(amount => {
              return (
                <td key={++keyCounter}>
                  {formatCurrency(amount, CURRENCY_OPTIONS)}
                </td>
              )
            })}
            <td>
              {formatCurrency(totalIndirectExpensesCashflow, CURRENCY_OPTIONS)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
