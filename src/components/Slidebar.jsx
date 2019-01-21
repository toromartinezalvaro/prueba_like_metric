import '../styles/index.sass'
import React, { Component } from 'react'
import Icon from './Icon'
import classNames from 'classnames'

export const SECTIONS = {
  DATA_INPUT: 'DATA_INPUT',
  RESULTS: 'RESULTS',
  SALES_ROOM: 'SALES_ROOM'
}

class Slidebar extends Component {
 
  render() {
    const { section, results } = this.props
    return (
      <div className='sidebar'>
        <div className='logo' onClick={this._reset}>
          <Icon name='replay' />
        </div>
        <div
          className={classNames('menu-item', {
            active: section === SECTIONS.DATA_INPUT
          })}
          onClick={() => this.props.changeSection(SECTIONS.DATA_INPUT)}
        >
          <Icon name='assignment' />
          <div className='tooltip'>
            Ingreso de datos
          </div>
        </div>
        {results &&
          <div
            className={classNames('menu-item', {
              active: this.props.section === SECTIONS.RESULTS
            })}
            onClick={() => this.props.changeSection(SECTIONS.RESULTS)}
          >
            <Icon name='assessment' />
            <div className='tooltip'>
              Reportes
             </div>
          </div>}
        <div
          className={classNames('menu-item', {
            active: section === SECTIONS.SALES_ROOM
          })}
          onClick={() => this.props.changeSection(SECTIONS.SALES_ROOM)}
        >
          <Icon name='assessment' />
          <div className='tooltip'>
              Sala de ventas
          </div>
        </div>
      </div>
    )
  }

  _reset = () => {
    window.location.reload()
  }
}

export default Slidebar;