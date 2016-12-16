/* globals requestAnimationFrame */

import React from 'react'
import {connect} from 'cerebral/react'
import {
  autoDetectRenderer,
  Container,
  Texture,
  Sprite
} from 'pixi.js'

export default connect({},
  function Home () {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
)

const renderer = autoDetectRenderer(150, 150, {backgroundColor: 0xcccccc})
document.body.appendChild(renderer.view)

// create the root of the scene graph
const stage = new Container()

// create a texture from an image path
const texture = Texture.fromImage('sun.png')

// create a new Sprite using the texture
const bunny = new Sprite(texture)

// center the sprite's anchor point
bunny.anchor.x = 0.5
bunny.anchor.y = 0.5

// move the sprite to the center of the screen
bunny.position.x = 75
bunny.position.y = 75

stage.addChild(bunny)

// start animating
animate()
function animate () {
  requestAnimationFrame(animate)

  // just for fun, let's rotate mr rabbit a little
  bunny.rotation += 0.03

  // render the container
  renderer.render(stage)
}
