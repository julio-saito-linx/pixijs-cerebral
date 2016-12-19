import React from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  rotationSpeed: 'sunRotationModule.rotationSpeed'
}, {
  rotationSpeedChanged: 'sunRotationModule.rotationSpeedChanged'
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
      // just for fun, let's rotate mr rabbit a little
      ctx.sun.rotation += props.rotationSpeed
    }

    return (
      <div className='page-container'>
        <h2>
          01 - Sun rotation
        </h2>
        <div className='bodyContent'>
          <div className='canvasContainer'>
            <Canvas
              zoomLevel={1}
              onStart={_onStart}
              onAnimate={_onAnimate}
            />
          </div>
          <div className='controlsContainer'>
            <div className='inputContainer'>
              <label htmlFor='test'>
                Speed:
              </label>
              <input
                id='test'
                type='range'
                min='-0.80'
                max='0.80'
                step='0.01'
                value={props.rotationSpeed}
                onChange={(e) => props.rotationSpeedChanged({speed: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
