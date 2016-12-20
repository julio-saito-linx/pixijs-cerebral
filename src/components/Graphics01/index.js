import React, {Component} from 'react'
import {connect} from 'cerebral/react'
import * as PIXI from 'pixi.js'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  initialValues: 'graphics01Module.initialValues'
},
  class Graphics01 extends Component {
    constructor (props) {
      super(props)
      this.state = Object.assign({
        mustRedrawGrid: false
      }, this.props.initialValues)
    }

    _drawGrid (ctx) {
      ctx.myGraphics = new PIXI.Graphics()

      // set a fill and line style
      ctx.myGraphics.lineStyle(1, 0x6666ee, 1)

      // draw a shape
      const squareSize = ctx.canvasSize.width / this.state.gridSize
      this._renderSquaresAllCanvas(ctx, squareSize)
      // window.ctx = ctx
      ctx.stage.addChild(ctx.myGraphics)
    }

    _renderSquaresAllCanvas (ctx, size) {
      const maxHeight = ctx.canvasSize.height
      for (let i = 0; size * i < maxHeight; i++) {
        this._fullRow(ctx, size, size * i)
      }
    }

    _fullRow (ctx, width, startOnHeight) {
      const maxLength = ctx.canvasSize.width
      let startPoint = [0, startOnHeight]
      let endPoint = [width, width + startOnHeight]
      while (startPoint[0] < maxLength) {
        this._drawSquare(ctx, startPoint, endPoint)
        startPoint[0] += width
        endPoint[0] += width
      }
    }

    _drawSquare (ctx, initial, final) {
      ctx.myGraphics.beginFill(0x333399)
      ctx.myGraphics.moveTo(...initial)
      ctx.myGraphics.lineTo(final[0], initial[1])
      ctx.myGraphics.lineTo(...final)
      ctx.myGraphics.lineTo(initial[0], final[1])
      ctx.myGraphics.lineTo(...initial)
      ctx.myGraphics.endFill()
    }

    _onStart ({ctx}) {
      ctx.stage = new PIXI.Container()
      this._drawGrid(ctx)
      window.ctx = ctx
    }

    _onAnimate (ctx) {
      if (this.state.mustRedrawGrid) {
        ctx.myGraphics.destroy()
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
                onStart={(ctx) => this._onStart(ctx)}
                onAnimate={(ctx) => this._onAnimate(ctx)}
              />
            </div>
            <input
              type='text'
              value={JSON.stringify(this.state.allItemsColors)}
              onChange={() => {}}
            />
          </div>
        </div>
      )
    }
  }
)
