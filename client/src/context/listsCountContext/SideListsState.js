import React, { useReducer } from 'react'
import { reducer, initialState } from './reducer'
import SideListsContext from './listsCountContext'
import * as types from './types'

const SideListsState = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setList = (list) => {
        dispatch({
            type: types.setList,
            list
        })
    }

    const setCustomLists = (lists) => {
        dispatch({
            type: types.setCustomLists,
            lists
        })
    }

    const addNewList = (list) => {
        dispatch({
            type: types.addNewList,
            list
        })
    }

    const increaseTaskCount = (list) => {
        dispatch({
            type: types.increaseTaskCount,
            list
        })
    }

    const decreaseTaskCount = (list) => {
        dispatch({
            type: types.decreaseTaskCount,
            list
        })
    }

    return (
        <SideListsContext.Provider
            value={{
                listsState: state,
                setList,
                setCustomLists,
                addNewList,
                increaseTaskCount,
                decreaseTaskCount
            }}
        >
            { children }
        </SideListsContext.Provider>
    )
}

export default SideListsState