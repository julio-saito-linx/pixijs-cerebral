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
      <h2>
        Color pattern
      </h2>
      <ul>
        <li>
          <a href='/colorPatternEdit?colors=f5d9c3,d2acb9,b4707f,75617c,412e34'>
            f5d9c3,d2acb9,b4707f,75617c,412e34
          </a>
        </li>
        <li>
          <a href='/colorPatternEdit?colors=0e1b2e,16314f,2a606c,4bf9f0,3a41b5'>
            0e1b2e,16314f,2a606c,4bf9f0,3a41b5
          </a>
        </li>
        <li>
          <a href='/colorPatternEdit?colors=cec4ab,b6a780,5c4732,82260f,211346'>
            cec4ab,b6a780,5c4732,82260f,211346
          </a>
        </li>
        <li>
          <a href='/colorPatternEdit?colors=c33823,a0cbb7,da894a,2c2421,0a080b'>
            c33823,a0cbb7,da894a,2c2421,0a080b
          </a>
        </li>
        <li>
          <a href='/colorPatternEdit?colors=6c9483,869c80,2b2b2c,b42c22,d1c0a5'>
            6c9483,869c80,2b2b2c,b42c22,d1c0a5
          </a>
        </li>
      </ul>

    </div>
  </div>
)
