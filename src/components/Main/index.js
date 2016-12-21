import React from 'react'
import {connect} from 'cerebral/react'
import SunRotation from '../SunRotation'
import SunRotation02 from '../SunRotation02'
import ColorPatternView from '../ColorPatternView'
import ColorPatternEdit from '../ColorPatternEdit'
import Home from '../Home'
import './styles.css'

const pages = {
  sunRotation: {
    component: SunRotation,
    title: 'Sun Rotation 1',
    backgroundColor: '#fff'
  },
  sunRotation02: {
    component: SunRotation02,
    title: 'Sun Rotation 2',
    backgroundColor: '#fff'
  },
  colorPatternEdit: {
    component: ColorPatternEdit,
    title: 'Color pattern edit',
    backgroundColor: '#fff'
  },
  colorPatternView: {
    component: ColorPatternView,
    title: 'Color pattern view',
    backgroundColor: '#000'
  },
  null: {
    component: Home,
    title: 'Sun Rotation',
    backgroundColor: '#fff'
  }
}

export default connect({
  currentPage: 'currentPage',
  title: 'title'
},
  function App (props) {
    const Page = pages[props.currentPage].component
    const title = pages[props.currentPage].title
    const backgroundColor = pages[props.currentPage].backgroundColor
    return (
      <div id='main-container' style={{backgroundColor}}>
        <div id='top-container'>
          <h1 className='title'>
            {title}
          </h1>
          <a href='/'>
            px-cer
          </a>
        </div>
        <Page />
      </div>
    )
  }
)
