import React from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  rotationSpeed: 'sunRotation02Module.rotationSpeed',
  reverseAcceleration: 'sunRotation02Module.reverseAcceleration'
}, {
  rotationSpeedChanged: 'sunRotation02Module.rotationSpeedChanged',
  reverseAccelerationChanged: 'sunRotation02Module.reverseAccelerationChanged'
},
  function SunRotation (props) {
    const _onStart = ({ctx, PIXI, canvasSize}) => {
      // create a texture from an image path
      const texture = PIXI.Texture.fromImage('sun.png')

      // create a new Sprite using the texture
      ctx.sun = new PIXI.Sprite(texture)

      // center the sprite's anchor point
      ctx.sun.anchor.x = 0.5
      ctx.sun.anchor.y = 0.5

      // move the sprite to the center of the screen
      ctx.sun.position.x = canvasSize.width / 2
      ctx.sun.position.y = canvasSize.height / 2

      ctx.stage.addChild(ctx.sun)
    }

    const _onAnimate = (ctx) => {
      let newSpeed = 0
      let absRotationSpeed = Math.abs(props.rotationSpeed * 1000)

      // change velocity
      if (props.rotationSpeed !== 0 &&
        absRotationSpeed > 0) {
        newSpeed = props.rotationSpeed - (props.rotationSpeed * props.reverseAcceleration)
      }

      // too slow, must stop
      if (Math.abs(newSpeed * 1000) <= 0) {
        newSpeed = 0
      }

      if (props.rotationSpeed !== newSpeed) {
        // update state
        props.rotationSpeedChanged({speed: newSpeed})
      }

      ctx.sun.rotation += newSpeed
    }

    return (
      <div className='page-container'>
        <h2>
          02 - Sun rotation that stops
        </h2>
        <div className='bodyContent'>
          <div className='controlsContainer'>
            <div className='inputContainer'>
              <label htmlFor='test'>
                Initial Speed:
              </label>
              <span>
                {Math.floor(props.rotationSpeed * 1000)}
              </span>
              <input
                id='test'
                type='range'
                min='-0.40'
                max='0.40'
                step='0.01'
                value={props.rotationSpeed}
                onChange={(e) => props.rotationSpeedChanged({speed: Number(e.target.value)})}
              />
            </div>
            <div className='inputContainer'>
              <label htmlFor='acceleration'>
                Reverse acceleration:
              </label>
              <span>
                {props.reverseAcceleration}
              </span>
              <input
                id='acceleration'
                type='range'
                min='0.00'
                max='0.10'
                step='0.01'
                value={props.reverseAcceleration}
                onChange={(e) => props.reverseAccelerationChanged({acceleration: Number(e.target.value)})}
              />
            </div>
          </div>
          <div className='canvasContainer'>
            <Canvas
              zoomLevel={1}
              onStart={_onStart}
              onAnimate={_onAnimate}
            />
          </div>
        </div>
      </div>
    )
  }
)
