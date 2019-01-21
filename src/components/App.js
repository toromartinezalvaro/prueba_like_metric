import React, { Component } from 'react'
import '../styles/index.sass'
import { getAll, getBuildings } from '../webapi/modules'
import InputForm from './InputForm'
import Results from './Results'
import Loading from './Loading'
import classNames from 'classnames'
import Slidebar, { SECTIONS } from './Slidebar'
import SalesRoom from './SalesRoom/SalesRoom';
import { Route, BrowserRouter } from "react-router-dom"
import AreaAdmin from './Admin/AreaAdmin'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      results: null,
      section: SECTIONS.DATA_INPUT,
      tabs: [
        {
          name: 'Tab 1',
          id: 'tab1'
        },
        {
          name: 'Tab 2',
          id: 'tab2'
        }
      ],
      activeTab: null,
      sectionTitle: null,
      inputFormData: null
    }
  }

  _getResult = params => {
    this.setState(
      {
        loading: true,
        tabs: null,
        sectionTitle: null,
        section: SECTIONS.RESULTS
      },
      () => {
        console.log("params s" + params);
        getAll(params).then(({ body }) => {
          this.setState({
            loading: false,
            results: body
          })
        })
      }
    )
  }

  _getBuildings = () => {
    this.setState({
      buildings: getBuildings()
    })
  }
  _changeSection = sectionName => {
    this.setState({
      section: sectionName
    })
  }

  _setTabs = tabs => {
    this.setState({
      tabs,
      activeTab: tabs[0] && tabs[0].id
    })
  }

  _setTab = activeTab => {
    this.setState({
      activeTab
    })
  }

  _setTitle = title => {
    this.setState({
      sectionTitle: title
    })
  }

  _onInputFormChange = state => {
    this.setState({
      inputFormData: state
    })
  }

  _reset = () => {
    window.location.reload()
  }

  componentWillMount() {
    this._getBuildings()
  }

  Home = () => {
  const { inputFormData, tabs, section, sectionTitle, results, loading, buildings } = this.state
  return ( 
  <div className='app'>
    <Slidebar results={results} section={section} changeSection={this._changeSection} />
    <div className='main-container'>
      <header className='header'>
        <div className='title'>
          <h1>{sectionTitle}</h1>
        </div>
        <div className='tabs'>
          {tabs &&
            tabs.map(tab => {
              const { id, name, onClick } = tab
              const { activeTab } = this.state
              return (
                <div
                  key={id}
                  className={classNames('tab', {
                    active: activeTab === id
                  })}
                  onClick={() => {
                    this._setTab(id)
                    if (onClick) {
                      onClick()
                    }
                  }}
                >
                  {name}
                </div>
              )
            })}
        </div>
      </header>
      <div className='content'>
        {section === SECTIONS.DATA_INPUT &&
          <InputForm
            inputFormData={inputFormData}
            onChange={this._onInputFormChange}
            getResult={this._getResult}
            setTabs={this._setTabs}
            setTitle={this._setTitle}
          />
        }
        {section === SECTIONS.RESULTS && loading && <Loading />}
        {section === SECTIONS.RESULTS &&
          !loading &&
          <Results
            results={results}
            setTabs={this._setTabs}
            setTitle={this._setTitle}
          />}
        {section === SECTIONS.SALES_ROOM &&
          <SalesRoom
            buildings={buildings}
            setTabs={this._setTabs}
            setTitle={this._setTitle}
          />}
      </div>
      <footer className='footer'>
        <span>Todos los derechos reservados © 2018</span>
      </footer>
    </div>
  </div>
  )
}

render() {
    return (
      <div>
          <BrowserRouter>
          <div>
          <Route path="/" component={this.Home} exact />
          <Route path="/admin" component={AreaAdmin} />
          </div>
          </BrowserRouter>

      </div>
    )
  }
}

export default App
