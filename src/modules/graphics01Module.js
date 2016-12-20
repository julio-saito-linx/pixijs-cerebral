import { set, state } from 'cerebral/operators'

export default {
  state: {
    initialValues: {
      gridSize: 25,
      playing: false,
      colors: [0xf5d9c3, 0xd2acb9, 0xb4707f, 0x75617c, 0x412e34]
    }
  },
  signals: {
    routed: [
      set(state`currentPage`, 'graphics01')
    ]
  }
}
