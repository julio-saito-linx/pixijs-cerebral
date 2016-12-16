import React from 'react'
import {connect} from 'cerebral/react'
import Home from '../Home'
import './styles.css'

const pages = {
  home: Home
}

export default connect({
  currentPage: 'currentPage',
  title: 'title'
},
  function App (props) {
    const Page = pages[props.currentPage]
    return (
      <div className='o-container o-container--medium'>
        <h1>{props.title}</h1>

        {pages[props.currentPage] && (
          <section className='main-container'>
            <Page />
          </section>
        )}

      </div>
    )
  }
)
