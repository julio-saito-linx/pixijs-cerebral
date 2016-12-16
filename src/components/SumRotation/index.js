import React from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({},
  function SumRotation () {
    return (
      <div className='page-container'>
        <h2>
          01 - Sum rotation
        </h2>
        <input id='test' type='range' min='-2' max='2' step='0.01' value='0.05' />
        <Canvas zoomLevel={1} />
      </div>
    )
  }
)
