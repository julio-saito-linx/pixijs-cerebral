import React from 'react'
import {connect} from 'cerebral/react'
import SunRotation from '../SunRotation'
import SunRotation02 from '../SunRotation02'
import Graphics01 from '../Graphics01'
import Graphics02 from '../Graphics02'
import Home from '../Home'
import './styles.css'

const pages = {
  sunRotation: SunRotation,
  sunRotation02: SunRotation02,
  graphics01: Graphics01,
  graphics02: Graphics02,
  home: Home
}

export default connect({
  currentPage: 'currentPage',
  title: 'title'
},
  function App (props) {
    const Page = pages[props.currentPage]
    return (
      <div className='container'>
        <h1 className='title'>
          <a href='/'>
            {props.title}
          </a>
        </h1>

        {pages[props.currentPage] && (
          <Page />
        )}

      </div>
    )
  }
)
