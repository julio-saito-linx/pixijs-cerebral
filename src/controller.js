import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import {set, state} from 'cerebral/operators'
import sunRotationModule from './modules/sunRotationModule'
import sunRotation02Module from './modules/sunRotation02Module'
import graphics01Module from './modules/graphics01Module'
import graphics02Module from './modules/graphics02Module'
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
    graphics01Module,
    graphics02Module,

    router: Router({
      onlyHash: false,
      filterFalsy: true,
      routes: [
        {
          path: '/:page?',
          map: {
            page: state`currentPage`,
            colors: state`graphics02Module.initialValues.urlColors`,
            pattern: state`graphics02Module.patterns`
          }
        }
      ]
    })
  }

})
