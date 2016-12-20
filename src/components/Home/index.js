import React from 'react'
import './styles.css'

export default () => (
  <div id='home-container'>
    <div className='link-item'>
      <a href='/sunRotation'>
        Sun rotation
      </a>
      <p>
        (constant velocity) - all state on cerebral
      </p>
    </div>
    <div className='link-item'>
      <a href='/sunRotation02'>
        Sun rotation
      </a>
      <p>
        (reverse aceleration) - all state local
      </p>
    </div>
    <div className='link-item'>
      <a href='/graphics02'>
        Color pattern editor
      </a>
    </div>
    <div className='link-item'>
      <a href='/graphics01'>
        Color pattern viewer
      </a>
    </div>
  </div>
)
