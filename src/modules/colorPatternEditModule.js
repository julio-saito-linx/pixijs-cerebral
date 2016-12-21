import {set, state} from 'cerebral/operators'

const createEmptyGrid = ({state}) => {
  // generate grid on state
  const currentItems = state.get('colorPatternEditModule.allItemsColors')
  if (currentItems.length === 0) {
    const allItemsColors = new Array(state.get('colorPatternEditModule.initialValues.gridSize'))
      .fill(null)
      .map(a => new Array(state.get('colorPatternEditModule.initialValues.gridSize')).fill(0))
    state.set('colorPatternEditModule.allItemsColors', allItemsColors)
  }
}

const setColors = ({state}) => {
  // generate colors from url
  const currentColors = state.get('colorPatternEditModule.colors')
  const urlColorsString = state.get('colorPatternEditModule.initialValues.urlColors')
  const initialColors = state.get('colorPatternEditModule.initialValues.initialColors')

  if (currentColors.length > 0 && !urlColorsString) {
    return
  }

  let parsedColors = urlColorsString || initialColors
  parsedColors = parsedColors
    .split(',')
    .map(c => Number(`0x${c}`))
  state.set('colorPatternEditModule.colors', parsedColors)
}

const setPatterns = ({state}) => {
  // generate colors from url
  const allItemsColors = state.get('colorPatternEditModule.allItemsColors')
  const urlPatterns = state.get('colorPatternEditModule.initialValues.urlPatterns')

  if (allItemsColors.length > 0 && !urlPatterns) {
    return
  }

  let parsedPatterns = urlPatterns
  parsedPatterns = parsedPatterns
    .split('-')
    .map(c => JSON.parse(`[${c}]`))

  state.set('colorPatternEditModule.allItemsColors', parsedPatterns)
}

const redirectWithData = ({state, router}) => {
  const colors = state.get('colorPatternEditModule.colors')
  const allItemsColors = state.get('colorPatternEditModule.allItemsColors')
  const queryStringColor = colors.map(c => c.toString(16))
  const queryStringAllItemsColors = allItemsColors.map(items => items.toString()).join('-')
  router.redirect(`/colorPatternEdit?colors=${queryStringColor}&patterns=${queryStringAllItemsColors}`)
}

const changeColorItem = ({state, input}) => {
  const rowIndex = input.rowIndex
  const colIndex = input.colIndex
  let allItemsColors = state.get(`colorPatternEditModule.allItemsColors`)
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
  state.set(`colorPatternEditModule.allItemsColors`, allItemsColors)
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
      // set(state`currentPage`, 'colorPatternEdit'),
      set(state`colorPatternEditModule.isLoading`, true),
      createEmptyGrid,
      setColors,
      setPatterns,
      redirectWithData,
      set(state`colorPatternEditModule.isLoading`, false)
    ],
    colorChanged: [
      changeColorItem,
      redirectWithData
    ]
  }
}
