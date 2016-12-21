import {set, state} from 'cerebral/operators'

const createEmptyGrid = ({state}) => {
  // generate grid on state
  const currentItems = state.get('graphics02Module.allItemsColors')
  if (currentItems.length === 0) {
    const allItemsColors = new Array(state.get('graphics02Module.initialValues.gridSize'))
      .fill(null)
      .map(a => new Array(state.get('graphics02Module.initialValues.gridSize')).fill(0))
    state.set('graphics02Module.allItemsColors', allItemsColors)
  }
}

const setColors = ({state}) => {
  // generate colors from url
  const urlColorsString = state.get('graphics02Module.initialValues.urlColors')
  const initialColors = state.get('graphics02Module.initialValues.initialColors')
  let parsedColors = urlColorsString || initialColors
  parsedColors = parsedColors
    .split(',')
    .map(c => Number(`0x${c}`))
  state.set('graphics02Module.colors', parsedColors)
}

const redirectWithColorQueryString = ({state, router}) => {
  const colors = state.get('graphics02Module.colors')
  const queryStringColor = colors.map(c => c.toString(16))
  router.redirect(`/graphics02?colors=${queryStringColor}`)
}

const changeColorItem = ({state, input}) => {
  const rowIndex = input.rowIndex
  const colIndex = input.colIndex
  let allItemsColors = state.get(`graphics02Module.allItemsColors`)
    .reduce((prev, curr, index) => {
      if (index === rowIndex) {
        prev.push(curr.reduce((prev, curr, i) => {
          if (i === colIndex) {
            prev.push(curr + 1)
          } else {
            prev.push(curr)
          }
          return prev
        }, []))
      } else {
        prev.push(curr)
      }
      return prev
    }, [])
  state.set(`graphics02Module.allItemsColors`, allItemsColors)
}
export default {
  state: {
    initialValues: {
      gridSize: 5,
      initialColors: 'f5d9c3,d2acb9,b4707f,75617c,412e34',
      playing: false
    },
    colors: [],
    allItemsColors: [],
    isLoading: true
  },
  signals: {
    started: [
      // set(state`currentPage`, 'graphics02'),
      set(state`graphics02Module.isLoading`, true),
      createEmptyGrid,
      setColors,
      redirectWithColorQueryString,
      set(state`graphics02Module.isLoading`, false)
    ],
    colorChanged: [
      changeColorItem
    ]
  }
}
