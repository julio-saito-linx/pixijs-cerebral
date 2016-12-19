import { set, state } from 'cerebral/operators'

export default {
  state: {
    initialValues: {
      rotationSpeed: 1,
      reverseAcceleration: 0.05,
      MAX_SPEED: 0.40,
      playing: false
    }
  },
  signals: {
    routed: [
      set(state`currentPage`, 'sunRotation02')
    ]
  }
}
