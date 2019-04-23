import React from 'react'

const Icon = ({ prefix, name, fixWidth }) => {
  let className = ''
  const fa = prefix ? prefix : 'fa' 

  className += fa
  className += ' '
  className += name
  className += ' '
  className += fixWidth ? 'fa-fw' : ''

  return <i className={className}></i>
}

export default Icon