import { createSlice, combineSlices } from '@reduxjs/toolkit'

const positionSlice = createSlice({
name: 'position',
initialState: {
    value: {}
},
reducers: {

}
})

const pointsSlice = createSlice({
name: 'points',
initialState: {
    value: 0
},
reducers: {
    incremented: state => {
    state.value += 1
    },
}
})

export const rootReducer = combineSlices(positionSlice, pointsSlice)