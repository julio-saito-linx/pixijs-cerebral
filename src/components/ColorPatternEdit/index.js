import React, {Component} from 'react'
import {connect} from 'cerebral/react'
import * as PIXI from 'pixi.js'
import Canvas from '../Canvas'
import './styles.css'

export default connect(
  {
    initialValues: 'colorPatternEditModule.initialValues',
    colors: 'colorPatternEditModule.colors',
    allItemsColors: 'colorPatternEditModule.allItemsColors',
    isLoading: 'colorPatternEditModule.isLoading'
  },
  {
    started: 'colorPatternEditModule.started',
    colorChanged: 'colorPatternEditModule.colorChanged'
  },
  class ColorPatternEdit extends Component {
    constructor (props) {
      super(props)
      this.state = Object.assign(
        {
          isPlaying: false,
          mustRedrawGrid: false
        },
        this.props.initialValues,
        {
          colors: this.props.colors
        }
      )
    }

    componentDidMount () {
      this.props.started()
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.colors !== this.props.colors) {
        this.setState({colors: nextProps.colors})
      }
    }

    _drawGrid () {
      const ctx = this.state.ctx
      ctx.stage = new PIXI.Container()
      const squareSize = ctx.canvasSize.width / this.state.gridSize
      this._renderSquaresAllCanvas(ctx, squareSize)
      this.setState({isPlaying: true})
    }

    _renderSquaresAllCanvas (ctx, size) {
      const maxHeight = ctx.canvasSize.height
      for (let i = 0; size * i < maxHeight; i++) {
        this._fullRow(ctx, size, size * i, i)
      }
    }

    _fullRow (ctx, width, startOnHeight, rowIndex) {
      const maxLength = ctx.canvasSize.width
      let startPoint = [0, startOnHeight]
      let endPoint = [width, width + startOnHeight]
      let columnIndex = 0
      while (startPoint[0] < maxLength) {
        this._drawSquare(ctx, startPoint, endPoint, rowIndex, columnIndex)
        startPoint[0] += width
        endPoint[0] += width
        columnIndex++
      }
    }

    _drawSquare (ctx, initial, final, rowIndex, colIndex) {
      const square = new PIXI.Graphics()
      // set a fill and line style
      square.lineStyle(1, 0x6666ee, 1)
      // draw a shape
      square.moveTo(...initial)

      // get color colIndex
      const maxRows = this.props.allItemsColors.length
      const maxColumns = this.props.allItemsColors[0].length
      const colorIndex = this.props.allItemsColors[rowIndex % maxRows][colIndex % maxColumns]
      const currentFillColor = this.state.colors[colorIndex % this.state.colors.length]
      square.beginFill(currentFillColor)
      square.lineTo(final[0], initial[1])
      square.lineTo(...final)
      square.lineTo(initial[0], final[1])
      square.lineTo(...initial)
      square.endFill()

      // mouse event
      square.interactive = true
      square.on('mousedown', (mouseData) => this._onSquarePressed(ctx, rowIndex % maxRows, colIndex % maxColumns))
      square.on('touchstart', (mouseData) => this._onSquarePressed(ctx, rowIndex % maxRows, colIndex % maxColumns))

      ctx.stage.addChild(square)
    }

    _onStart ({ctx}) {
      this.setState({ctx}, () => {
        this._drawGrid()
      })
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

    _onSquarePressed (ctx, rowIndex, colIndex) {
      // const allItemsColors = this.props.allItemsColors
      // allItemsColors[rowIndex][colIndex] += 1
      // this.setState({allItemsColors})
      this.props.colorChanged({
        rowIndex,
        colIndex
      })
      ctx.stage.destroy()
      this._drawGrid(ctx)
    }

    render () {
      if (this.props.isLoading ||
        typeof this.state.colors === 'undefined') {
        return null
      }

      return (
        <div id='pattern-editor-container'>
          <div className='bodyContent'>
            <div className='canvasContainer'>
              <Canvas
                zoomLevel={1}
                backgroundColor={0x333333}
                isPlaying={this.state.isPlaying}
                onStart={(ctx) => this._onStart(ctx)}
                onAnimate={(ctx) => this._onAnimate(ctx)}
              />
            </div>

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
                  min={this.state.colors.length}
                  max={this.state.colors.length * 3}
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
          </div>

          <div className='controlsContainer'>
            <a className='linkItem' href='/colorPatternEdit'>
              Edit
            </a>
            <a className='linkItem' href='/colorPatternView'>
              View
            </a>
          </div>
        </div>
      )
    }
  }
)
