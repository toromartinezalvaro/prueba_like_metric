import React, { Component } from 'react'
import '../../styles/index.sass'
import CreatePrimeType from './CreatePrimeType'
import CreateAreaType from './CreateAreaType'
import CreateArea from './CreateArea'
import CreatePrime from './CreatePrime'
import PropertyTypology from './PropertyTypology/PropertyTypology'


export const SECTIONS = {
    PRIME_TYPE: 'PRIME_TYPE',
    PRIME: 'PRIME',
    AREA_TYPE: 'AREA_TYPE',
    AREA: 'AREA',
    PROPERTY_TYPOLOGY: 'PROPERTY_TYPOLOGY'
}

class AreaAdmin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            section: SECTIONS.AREA_TYPE
        }
    }

    _nextStep= () => {
        const { section } = this.state
        var currentSection = SECTIONS.AREA_TYPE 
        switch (section) {
            // case SECTIONS.PRIME_TYPE:
            //     currentSection = SECTIONS.AREA_TYPE
            //     break;
            case SECTIONS.AREA_TYPE:
                currentSection = SECTIONS.PROPERTY_TYPOLOGY
                break;
            default:
            break;
        }
      
        this.setState({
            section: currentSection
        })
    }

    render() {
        const { section } = this.state
        return (
            <div className='area-admin'>
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
                    <div className='submit-form'>
                        <button onClick={this._nextStep}>Siguiente</button>
                    </div>
            </div>
        )
    }
}

export default AreaAdmin;