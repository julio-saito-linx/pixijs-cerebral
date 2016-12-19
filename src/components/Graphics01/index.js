import React, {Component} from 'react'
import {connect} from 'cerebral/react'
import Canvas from '../Canvas'
import './styles.css'

export default connect({
  initialValues: 'sunRotation02Module.initialValues'
},
  class Graphics01 extends Component {
    constructor (props) {
      super(props)
      this.state = Object.assign({}, this.props.initialValues)
    }

    _onStart ({ctx, PIXI}) {
      ctx.mySquare = new PIXI.Graphics()

      // set a fill and line style
      ctx.mySquare.beginFill(0x333399)
      ctx.mySquare.lineStyle(4, 0x6666ee, 1)

      // draw a shape
      const MARGIN = 50
      const INITIAL = [MARGIN, MARGIN]
      const FINAL = [ctx.canvasSize.width - MARGIN, ctx.canvasSize.height - MARGIN]

      ctx.mySquare.moveTo(...INITIAL)
      ctx.mySquare.lineTo(FINAL[0], INITIAL[1])
      ctx.mySquare.lineTo(...FINAL)
      ctx.mySquare.lineTo(INITIAL[0], FINAL[1])
      ctx.mySquare.lineTo(...INITIAL)
      ctx.mySquare.endFill()

      window.ctx = ctx

      ctx.stage.addChild(ctx.mySquare)
    }

    _onAnimate (ctx) {
      // ctx.mySquare.position.x += 0.1
    }

    render () {
      return (
        <div className='page-container'>
          <h2 className='sub-title'>
            01 - Graphics example
          </h2>
          <p className='explanation'>
            A simple square
          </p>
          <div className='bodyContent'>
            <div className='canvasContainer'>
              <Canvas
                zoomLevel={1}
                backgroundColor={0x333333}
                width={300}
                height={300}
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
