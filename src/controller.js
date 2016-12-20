import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import { set, state } from 'cerebral/operators'
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
    currentPage: 'home',
    title: 'Pixi.js + Cerebral.js'
  },

  router: Router({
    routes: {
      '/': 'routed',
      '/sunRotation': 'sunRotationModule.routed',
      '/sunRotation02': 'sunRotation02Module.routed',
      '/graphics01': 'graphics01Module.routed',
      '/graphics02': 'graphics02Module.routed',
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
    sunRotation02Module,
    graphics01Module,
    graphics02Module,
    homeModule
  }

})
