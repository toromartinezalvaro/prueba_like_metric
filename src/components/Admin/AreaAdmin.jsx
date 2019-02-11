import React, { Component } from 'react'
import '../../styles/index.sass'
import CreatePrimeType from './Prime/CreatePrimeType'
import CreateAreaType from './CreateAreaType'
import CreateArea from './CreateArea'
import CreatePrime from './Prime/CreatePrime'
import PropertyTypology from './PropertyTypology/PropertyTypology'
import AreaAdminSlidebar, { SECTIONS } from './AreaAdminSlidebar'
import CreateBuilding from './Building/CreateBuilding';

class AreaAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            section: SECTIONS.AREA_TYPE
        }
    }

    _changeSection= (section) => {
        this.setState({
            section: section
        })
    }

    render() {
        const { section } = this.state
        return (
            <div className='area-admin'> 
                <AreaAdminSlidebar section={section} changeSection={this._changeSection} />
                <div className='area-container'>
                {
                    section === SECTIONS.PRIME_TYPE &&
                    <CreatePrimeType />
                }
                {
                    section === SECTIONS.PROPERTY_TYPOLOGY && 
                    <PropertyTypology />
                }
                {
                    section === SECTIONS.AREA_TYPE && 
                    <CreateArea />
                }
                {
                    section === SECTIONS.PRIME && 
                    <CreatePrime />
                }
                {
                    section == SECTIONS.BUILDING &&
                    <CreateBuilding />
                }
                    {/* <div className='submit-form'>
                        <button onClick={this._nextStep}>Siguiente</button>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default AreaAdmin;