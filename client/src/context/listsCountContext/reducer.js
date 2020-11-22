import { decapitalize } from '../../utils/utils'
import * as types from './types'

export const initialState = {
    general: {},
    important: {},
    lists: []
}

const updateCount = (state, action, number) => {
    // debugger
    const defaultList = decapitalize(action.list.title)
    if (state[defaultList]) {
        return {
            ...state,
            [defaultList]: { ...state[defaultList], taskCount: (+state[defaultList].taskCount || 0) + number}
        }
    }
    console.log('cc')
    console.log(action)
    console.log(state)
    return {
        ...state,
        lists: state.lists.map(list => {
            if (list._id === action.list._id) {
                return { ...list, taskCount: (+list.taskCount || 0) + number }
            }
            return list
        })
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case types.setList:
            return {
                ...state,
                [decapitalize(action.list.title)]: action.list
            }
        case types.setCustomLists:
            return {
                ...state,
                lists: action.lists
            }
        case types.addNewList:
            return {
                ...state,
                lists: [ ...state.lists, action.list ]
            }
        case types.increaseTaskCount:
            return updateCount(state, action, +1)
        case types.decreaseTaskCount:
            return updateCount(state, action, -1)
        default:
            return state
    }
}
