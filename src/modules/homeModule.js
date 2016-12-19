import { set, state } from 'cerebral/operators'

export default {
  state: {
  },
  signals: {
    routed: [
      set(state`currentPage`, 'home')
    ]
  }
}
