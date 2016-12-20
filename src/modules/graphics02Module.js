import { set, state } from 'cerebral/operators'

export default {
  state: {
    initialValues: {
      gridSize: 5,
      playing: false,
      colors: [0xf5d9c3, 0xd2acb9, 0xb4707f, 0x75617c, 0x412e34],
    },
    allItemsColors: []
  },
  signals: {
    routed: [
      set(state`currentPage`, 'graphics02'),
      ({state}) => {
        const currentItems = state.get('graphics02Module.allItemsColors')
        if (currentItems.length === 0) {
          const allItemsColors = new Array(state.get('graphics02Module.initialValues.gridSize'))
            .fill(null)
            .map(a => new Array(state.get('graphics02Module.initialValues.gridSize')).fill(0))
          state.set('graphics02Module.allItemsColors', allItemsColors)
        }
      }
    ],
    colorChanged: [
      ({state, input}) => {
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

        // allItemsColors[rowIndex][colIndex] = allItemsColors[rowIndex][colIndex] + 1

        // allItemsColors[rowIndex][colIndex] += 1
        // const value = allItemsColors[rowIndex][colIndex]
        // console.log(`--value--`); console.log(value) // DEBUG
        state.set(`graphics02Module.allItemsColors`, allItemsColors)
      }
    ]
  }
}
