import { set, state, input } from 'cerebral/operators'

export default {
  state: {
    rotationSpeed: -0.20,
    reverseAcceleration: 0.05,
    MAX_SPEED: 0.40,
    playing: false
  },
  signals: {
    routed: [
      set(state`currentPage`, 'sunRotation02')
    ],
    rotationSpeedChanged: [
      set(state`sunRotation02Module.rotationSpeed`, input`speed`)
    ],
    reverseAccelerationChanged: [
      set(state`sunRotation02Module.reverseAcceleration`, input`acceleration`)
    ]
  }
}
