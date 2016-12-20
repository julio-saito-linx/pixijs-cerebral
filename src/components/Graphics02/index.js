import React, {Component} from 'react'
import {connect} from 'cerebral/react'
import * as PIXI from 'pixi.js'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  initialValues: 'graphics02Module.initialValues'
},
  class Graphics02 extends Component {
    constructor (props) {
      super(props)
      this.state = Object.assign({
        mustRedrawGrid: false
      }, this.props.initialValues)
    }

    _drawGrid (ctx) {
      // create the root of the scene graph
      ctx.stage = new PIXI.Container()
      const squareSize = ctx.canvasSize.width / this.state.gridSize
      this._renderSquaresAllCanvas(ctx, squareSize)

      // // mouse event
      // ctx.stage.interactive = true
      // ctx.stage.on('mousedown', (mouseData) => this._onSunMouseDown(ctx, mouseData))
      // ctx.stage.on('touchstart', (mouseData) => this._onSunMouseDown(ctx, mouseData))
    }

    _onSunMouseDown (ctx, mouseData) {
      console.log(`--mouseData.data.target.graphicsData--`); console.log(mouseData.data.target.graphicsData.map(g => g.fillColor)) // DEBUG
    }

    _renderSquaresAllCanvas (ctx, size) {
      const maxHeight = ctx.canvasSize.height
      for (let i = 0; size * i < maxHeight; i++) {
        this._fullRow(ctx, size, size * i, i + 1)
      }
    }

    _fullRow (ctx, width, startOnHeight, index) {
      const maxLength = ctx.canvasSize.width
      let startPoint = [0, startOnHeight]
      let endPoint = [width, width + startOnHeight]
      let columnIndex = 0
      while (startPoint[0] < maxLength) {
        this._drawSquare(ctx, startPoint, endPoint, columnIndex)
        startPoint[0] += width
        endPoint[0] += width
        columnIndex++
      }
    }

    _drawSquare (ctx, initial, final, index) {
      const square = new PIXI.Graphics()
      // set a fill and line style
      square.lineStyle(1, 0x6666ee, 1)
      // draw a shape
      square.moveTo(...initial)
      square.beginFill(this.state.colors[index % this.state.colors.length])
      square.lineTo(final[0], initial[1])
      square.lineTo(...final)
      square.lineTo(initial[0], final[1])
      square.lineTo(...initial)
      square.endFill()

      // mouse event
      square.interactive = true
      square.on('mousedown', (mouseData) => this._onSunMouseDown(ctx, mouseData))
      square.on('touchstart', (mouseData) => this._onSunMouseDown(ctx, mouseData))

      ctx.stage.addChild(square)
    }

    _onStart ({ctx}) {
      this._drawGrid(ctx)
      window.ctx = ctx
    }

    _onAnimate (ctx) {
      if (this.state.mustRedrawGrid) {
        ctx.stage.destroy()
        this._drawGrid(ctx)
        this.setState({
          mustRedrawGrid: false
        })
      }
    }

    render () {
      return (
        <div className='page-container'>
          <h2 className='sub-title'>
            01 - Graphics example
          </h2>
          <p className='explanation'>
            grid
          </p>
          <div className='controlsContainer'>
            <div className='inputContainer'>
              <label htmlFor='gridSize'>
                Grid size:
              </label>
              <span>
                {this.state.gridSize}
              </span>
              <input
                id='gridSize'
                type='range'
                min={1}
                max={100}
                step='1'
                value={this.state.gridSize}
                onChange={(e) => {
                  this.setState({
                    gridSize: Number(e.target.value),
                    mustRedrawGrid: true
                  })
                }}
              />
            </div>
          </div>
          <div className='bodyContent'>
            <div className='canvasContainer'>
              <Canvas
                zoomLevel={1}
                backgroundColor={0x333333}
                width={600}
                height={600}
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
