import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import {set, state} from 'cerebral/operators'
import sunRotationModule from './modules/sunRotationModule'
import sunRotation02Module from './modules/sunRotation02Module'
import colorPatternViewModule from './modules/colorPatternViewModule'
import colorPatternEditModule from './modules/colorPatternEditModule'
import homeModule from './modules/homeModule'

export default Controller({
  options: {
    // Use strict rendering
    strictRender: true,
    // Expose props.signals with all signals in components
    signalsProp: false
  },

  // devtools: process.env.NODE_ENV === 'production' ? null : Devtools(),
  devtools: Devtools({
    // If running standalone debugger
    // remoteDebugger: 'localhost:8585',
    // Time travel
    storeMutations: false
  }),

  // Defines the top level state
  state: {
    currentPage: 'home'
  },

  // Defines the top level signals
  signals: {
    routed: [
      set(state`currentPage`, 'home')
    ]
  },

  // Defines the top level modules
  modules: {
    homeModule,
    sunRotationModule,
    sunRotation02Module,
    colorPatternViewModule,
    colorPatternEditModule,

    router: Router({
      onlyHash: false,
      filterFalsy: true,
      routes: [
        {
          path: '/:page?',
          map: {
            page: state`currentPage`,
            colors: state`colorPatternEditModule.initialValues.urlColors`,
            patterns: state`colorPatternEditModule.initialValues.urlPatterns`
          }
        }
      ]
    })
  }

})
