import React from 'react'
import {connect} from 'cerebral/react'
import SumRotation from '../SumRotation'
import './styles.css'

const pages = {
  home: SumRotation
}

export default connect({
  currentPage: 'currentPage',
  title: 'title'
},
  function App (props) {
    const Page = pages[props.currentPage]
    return (
      <div className='container'>
        <h1>{props.title}</h1>

        {pages[props.currentPage] && (
          <Page />
        )}

      </div>
    )
  }
)
