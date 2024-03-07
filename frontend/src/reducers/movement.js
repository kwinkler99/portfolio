import { createSlice, combineSlices } from '@reduxjs/toolkit'

const pointsSlice = createSlice({
name: 'points',
initialState: {
    value: 0
},
reducers: {
    incremented: state => {
        state.value += 1
    },
    resetPoints: state => {
        state.value = 0
    }
}
})

export const { incremented, resetPoints } = pointsSlice.actions

const checkPosition = (newHeadPosition, tailPosition) => {
    return newHeadPosition[0] === tailPosition[0] && newHeadPosition[1] === tailPosition[1]
}

const checkPoint = (newHeadPosition, pointPosition) => {
    return newHeadPosition[0] === pointPosition[0] && newHeadPosition[1] === pointPosition[1]
}

const createNewPoint = (board, occupiedCells) => {
    let newPointPosition = [Math.round(Math.random() * (board - 1)), Math.round(Math.random() * (board - 1))]
    let occupied = false
    for (const cell of occupiedCells) {
        if (newPointPosition.every((val, index) => val === cell[index]) ) {
            occupied = true
            break;
        }
    }
    
    return occupied ? createNewPoint(board, occupiedCells) : newPointPosition
}

const checkBite = (newHeadPosition, tailPosition) => {
    let bite = false
    let bitePosition = []
    for (const cell of tailPosition.slice(0, -1)) {
        if (newHeadPosition.every((val, index) => val === cell[index]) ) {
            bite = true
            bitePosition = newHeadPosition
            break;
        }
    }
    return {bite, bitePosition}
}

const initialState = {
    board: 14,
    direction: "down",
    head: [6, 8],
    tail: [
        [5, 8],
        [5, 7],
        [5, 6],
        [5, 5]
    ],
    bite: null,
    point: [5, 2]
}

const positionSlice = createSlice({
    name: 'position',
    initialState: initialState,
    reducers: {
        reset: () => initialState,
        right: state => {
            let newHeadPosition = [state.head[0], (state.head[1] + 1) % state.board]
            const { bite, bitePosition } = checkBite(newHeadPosition, state.tail)
            if (!bite){
                if (!checkPosition(newHeadPosition, state.tail[0])) {
                    state.tail.unshift(state.head)
                    state.head = newHeadPosition
                    state.direction = "right"

                    if (!checkPoint(newHeadPosition, state.point)) {
                        state.tail.pop()
                    } else {
                        state.point = createNewPoint(state.board, [...state.tail, state.head])
                    }
                }
            } else {
                state.direction = "right"
                state.bite = bitePosition
            }
        },
        left: state => {
            let negativeChangeToPositive = state.head[1] - 1 < 0 ? state.board - 1 : state.head[1] - 1 
            let newHeadPosition = [state.head[0], negativeChangeToPositive]
            const { bite, bitePosition } = checkBite(newHeadPosition, state.tail)
            if (!bite){
                if (!checkPosition(newHeadPosition, state.tail[0])) {
                    state.tail.unshift(state.head)
                    state.head = newHeadPosition
                    state.direction = "left"
                    
                    if (!checkPoint(newHeadPosition, state.point)) {
                        state.tail.pop()
                    } else {
                        state.point = createNewPoint(state.board, [...state.tail, state.head])
                    }
                }
            } else {
                state.direction = "left"
                state.bite = bitePosition
            }
        },
        up: state => {
            let negativeChangeToPositive = state.head[0] - 1 < 0 ? state.board - 1 : state.head[0] - 1 
            let newHeadPosition = [negativeChangeToPositive, state.head[1]]
            const { bite, bitePosition } = checkBite(newHeadPosition, state.tail)
            if (!bite){
                if (!checkPosition(newHeadPosition, state.tail[0])) {
                    state.tail.unshift(state.head)
                    state.head = newHeadPosition
                    state.direction = "up"

                    if (!checkPoint(newHeadPosition, state.point)) {
                        state.tail.pop()
                    } else {
                        state.point = createNewPoint(state.board, [...state.tail, state.head])
                    }
                }
            } else {
                state.direction = "up"
                state.bite = bitePosition
            }
        },
        down: state => {
            let newHeadPosition = [(state.head[0] + 1) % state.board, state.head[1]]
            const { bite, bitePosition } = checkBite(newHeadPosition, state.tail)
            if (!bite){
                if (!checkPosition(newHeadPosition, state.tail[0])) {
                    state.tail.unshift(state.head)
                    state.head = newHeadPosition
                    state.direction = "down"

                    if (!checkPoint(newHeadPosition, state.point)) {
                        state.tail.pop()
                    } else {
                        state.point = createNewPoint(state.board, [...state.tail, state.head])
                    }
                }
            } else {
                state.direction = "down"
                state.bite = bitePosition
            }
        }
    }
})

export const { reset, right, left, up, down } = positionSlice.actions

export const rootReducer = combineSlices(positionSlice, pointsSlice)