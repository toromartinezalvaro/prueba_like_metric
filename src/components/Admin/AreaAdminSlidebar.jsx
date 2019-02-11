import React, { Component } from 'react'
import Icon from '../Icon'
import classNames from 'classnames'

export const SECTIONS = {
    PRIME_TYPE: 'PRIME_TYPE',
    PRIME: 'PRIME',
    AREA_TYPE: 'AREA_TYPE',
    AREA: 'AREA',
    PROPERTY_TYPOLOGY: 'PROPERTY_TYPOLOGY',
    BUILDING: 'BUILDING'
}

class AreaAdminSlidebar extends Component {

    item(toolTipText, iconName, currentSection, itemSection, changeSection) {
        return <div
            className={classNames('menu-item', {
                active: currentSection === itemSection
            })}
            onClick={() => changeSection(itemSection)}
        >
            <Icon name={iconName} />
            <div className='tooltip'>
                {toolTipText}
            </div>
        </div>
    }

    render() {
        const { section, changeSection } = this.props
        return (
            <div className='area-admin-slidebar'>
                {
                    [
                        this.item("Crear area", "store", section, SECTIONS.AREA_TYPE, changeSection),
                        this.item("Crear tipos de inmueble", "home", section, SECTIONS.PROPERTY_TYPOLOGY, changeSection),
                        this.item("Crear primas", "business", section, SECTIONS.PRIME, changeSection),
                        this.item("Crear edificio", "business", section, SECTIONS.BUILDING, changeSection)
                    ]
                }
            </div>
        )
    }

    _reset = () => {
        window.location.reload()
    }
}

export default AreaAdminSlidebar;
