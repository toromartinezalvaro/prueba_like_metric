import React from 'react'
import spinner from '../images/loading.gif'

const Loading = () => {
  return (
    <div className='loading'>
      <img alt='Loading' src={spinner} />
    </div>
  )
}

export default Loading