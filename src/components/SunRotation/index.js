import React from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  rotationSpeed: 'sunRotation.rotationSpeed'
}, {
  rotationSpeedChanged: 'sunRotation.rotationSpeedChanged'
},
  function SunRotation (props) {
    return (
      <div className='page-container'>
        <h2>
          01 - Sun rotation
        </h2>
        <input
          id='test'
          type='range'
          min='-0.80'
          max='0.80'
          step='0.01'
          value={props.rotationSpeed}
          onChange={(e) => props.rotationSpeedChanged({speed: Number(e.target.value)})}
        />
        <Canvas zoomLevel={1} />
      </div>
    )
  }
)