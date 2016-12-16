import { set, state, input } from 'cerebral/operators'

export default {
  state: {
    rotationSpeed: 0.05
  },
  signals: {
    rotationSpeedChanged: [
      set(state`sunRotation.rotationSpeed`, input`speed`)
    ]
  }
}
