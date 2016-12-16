import React from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({},
  function SumRotation () {
    return (
      <div className='page-container'>
        <h2>SumRotation</h2>
        <Canvas zoomLevel={1} />
      </div>
    )
  }
)
