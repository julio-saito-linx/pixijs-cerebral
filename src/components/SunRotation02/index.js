import React, {Component} from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  initialValues: 'sunRotation02Module.initialValues'
},
  class SunRotation extends Component {
    constructor (props) {
      super(props)
      this.state = Object.assign({}, this.props.initialValues)
      console.log(this.state)
    }

    _onSunMouseDown (ctx, mouseData) {
      const START = 255
      const SUN_WIDTH = ctx.sun.width
      const clickedAtX = mouseData.data.global.x
      const MIDDLE = START + (SUN_WIDTH / 2)
      const OFFSET_X = MIDDLE - clickedAtX
      this.setState({
        rotationSpeed: this.state.MAX_SPEED * (OFFSET_X / (SUN_WIDTH / 2))
      })
    }

    _onStart ({ctx, PIXI, canvasSize}) {
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

      // mouse event
      ctx.sun.interactive = true
      ctx.sun.on('mousedown', (mouseData) => this._onSunMouseDown(ctx, mouseData))
      ctx.sun.on('touchstart', (mouseData) => this._onSunMouseDown(ctx, mouseData))
    }

    _onAnimate (ctx) {
      let newSpeed = 0
      let absRotationSpeed = Math.abs(this.state.rotationSpeed * 1000)

      // change velocity
      if (this.state.rotationSpeed !== 0 &&
        absRotationSpeed > 0) {
        newSpeed = this.state.rotationSpeed - (this.state.rotationSpeed * this.state.reverseAcceleration)
      }

      // too slow, must stop
      if (Math.abs(newSpeed * 1000) <= 0) {
        newSpeed = 0
      }

      if (this.state.rotationSpeed !== newSpeed) {
        // update state
        this.setState({
          rotationSpeed: newSpeed
        })
      }

      ctx.sun.rotation += newSpeed
    }

    render (props) {
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
                  {Math.floor(this.state.rotationSpeed * 1000)}
                </span>
                <input
                  id='test'
                  type='range'
                  min={-this.state.MAX_SPEED}
                  max={this.state.MAX_SPEED}
                  step='0.01'
                  value={this.state.rotationSpeed}
                  onChange={(e) => {
                    this.setState({
                      rotationSpeed: Number(e.target.value)
                    })
                  }}
                />
              </div>
              <div className='inputContainer'>
                <label htmlFor='acceleration'>
                  Reverse acceleration:
                </label>
                <span>
                  {this.state.reverseAcceleration}
                </span>
                <input
                  id='acceleration'
                  type='range'
                  min='0.00'
                  max='0.10'
                  step='0.01'
                  value={this.state.reverseAcceleration}
                  onChange={(e) => {
                    this.setState({
                      reverseAcceleration: Number(e.target.value)
                    })
                  }}
                />
              </div>
            </div>
            <div className='canvasContainer'>
              <Canvas
                zoomLevel={1}
                onStart={(ctx) => this._onStart(ctx)}
                onAnimate={(ctx) => this._onAnimate(ctx)}
              />
            </div>
          </div>
        </div>
      )
    }
  }
)
