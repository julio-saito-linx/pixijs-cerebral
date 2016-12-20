import { set, state } from 'cerebral/operators'

export default {
  state: {
    initialValues: {
      gridSize: 4,
      playing: false
    }
  },
  signals: {
    routed: [
      set(state`currentPage`, 'graphics01')
    ]
  }
}