import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import { set, state } from 'cerebral/operators'
import sunRotationModule from './modules/sunRotationModule'
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
    currentPage: 'home',
    title: 'Pixi.js + Cerebral.js'
  },

  router: Router({
    routes: {
      '/': 'routed',
      '/sunRotation': 'sunRotationModule.routed',
      '/home': 'homeModule.routed'
    },
    query: false, // Query support
    onlyHash: false, // Use hash urls
    baseUrl: '' // Only handle url changes on nested path
  }),

  // Defines the top level signals
  signals: {
    routed: [
      set(state`currentPage`, 'home')
    ]
  },

  // Defines the top level modules
  modules: {
    sunRotationModule,
    homeModule
  }

})
