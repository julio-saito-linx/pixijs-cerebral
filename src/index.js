import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import controller from './controller'
import {Container} from 'cerebral/react'

ReactDOM.render((
  <Container controller={controller}>
    <Main />
  </Container>
), document.querySelector('#root'))
