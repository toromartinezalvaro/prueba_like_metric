import React, { Component } from 'react'
import { BuildingDetails } from './BuildingDetail';

const TABS = {
  PROJECT_DETAIL: 'PROJECT_DETAIL',
  PROPERTY: 'PROPERTY',
  SUMMARY:  'SUMMARY'
}

class SalesRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: TABS.PROJECT_DETAIL
    }
  }

  componentWillMount () {
    const { setTabs, setTitle } = this.props
    setTabs([
      {
        name: 'Edificio',
        id: TABS.PROJECT_DETAIL,
        onClick: () => this._setTab(TABS.PROJECT_DETAIL)
      },
      {
        name: 'Inmueble',
        id: TABS.PROPERTY,
        onClick: () => this._setTab(TABS.PROPERTY)
      },
      {
        name: 'Resumen',
        id: TABS.SUMMARY,
        onClick: () => this._setTab(TABS.SUMMARY)
      }
    ])
    setTitle('Sala de ventas')
  }

  _setTab = tab => {
    this.setState({ tab })
  }

  render () {
    const { tab } = this.state
    const { buildings } = this.props
    if (!buildings) {
      return null
    }

    return (
      <div className='results'>
        {tab === TABS.PROJECT_DETAIL &&
          <BuildingDetails
            buildings={buildings}
          />}
        {tab === TABS.PROPERTY}
      </div>
    )
  }
}

export default SalesRoom
