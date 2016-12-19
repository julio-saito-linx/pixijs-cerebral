import { set, state, input } from 'cerebral/operators'

export default {
  state: {
    rotationSpeed: 0.05
  },
  signals: {
    routed: [
      set(state`currentPage`, 'sunRotation')
    ],
    rotationSpeedChanged: [
      set(state`sunRotationModule.rotationSpeed`, input`speed`)
    ]
  }
}
