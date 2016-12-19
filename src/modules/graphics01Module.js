import { set, state } from 'cerebral/operators'

export default {
  state: {
    initialValues: {
      playing: false
    }
  },
  signals: {
    routed: [
      set(state`currentPage`, 'graphics01')
    ]
  }
}
