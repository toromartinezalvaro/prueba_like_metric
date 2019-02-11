import React, { Component } from 'react'
import Icon from '../../Icon'
import ExpenseDetails from './ExpenseDetails'

class DirectExpenses extends Component {
  constructor (props) {
    super(props)
    const { expenses } = props
    this.state = {
      expenses: expenses && expenses.length > 0 ? expenses : [{}]
    }
  }

  _onChange = (index, state) => {
    const { expenses } = this.state
    expenses[index] = state
    this.setState(
      {
        expenses
      },
      () => {
        const { onChange } = this.props
        onChange({
          formName: 'directExpenses',
          target: {
            name: 'expenses',
            value: expenses
          }
        })
      }
    )
  }

  _add = event => {
    const { expenses } = this.state
    this.setState({
      expenses: [...expenses, {}]
    })
  }

  _remove = event => {
    const { expenses } = this.state
    if (expenses.length > 1) {
      expenses.pop()
      this.setState({
        expenses
      })
    }
  }

  _removeAt = index => {
    const { expenses } = this.state
    if (expenses.length > 1 && index < expenses.length) {
      const newExpenses = [...expenses]
      newExpenses.splice(index, 1)
      this.setState({
        expenses: newExpenses
      }, () => {
        const { onChange } = this.props
        onChange({
          formName: 'directExpenses',
          target: {
            name: 'expenses',
            value: newExpenses
          }
        })
      })
    }
  }

  render () {
    let expenseDetailsIndex = 0
    const { expenses } = this.state
    return (
      <div className='input-form'>
        <form>
          {expenses.map(expense => {
            return (
              <ExpenseDetails
                index={expenseDetailsIndex}
                onChange={this._onChange}
                remove={this._removeAt}
                key={expenseDetailsIndex++}
                {...expense}
              />
            )
          })}
          <div className='add-row'>
            {expenses.length > 1 &&
              <div className='remove-button' onClick={this._remove}>
                <Icon name='remove' />
              </div>}
            <div className='add-button' onClick={this._add}>
              <Icon name='add' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default DirectExpenses
