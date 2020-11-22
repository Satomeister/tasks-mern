import React, { useReducer } from 'react'
import ListContext from './listContext'
import { initialState, reducer } from './reducer'
import * as types from './types'

const ListState = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setList = (list) => {
        dispatch({
            type: types.setList,
            list
        })
    }

    const addTask = (task) => {
        dispatch({
            type: types.addTask,
            task
        })
    }

    const doneToggle = (id) => {
        dispatch({
            type: types.doneToggle,
            id
        })
    }

    const setTask = (task) => {
        dispatch({
            type: types.setTask,
            task
        })
    }

    const editTaskValue = (task) => {
        dispatch({
            type: types.editTaskValue,
            ...task
        })
    }

    const addStep = (step) => {
        dispatch({
            type: types.addStep,
            step
        })
    }

    const removeStep = (id) => {
        dispatch({
            type: types.deleteStep,
            id
        })
    }

    const removeTask = (id) => {
        dispatch({
            type: types.deleteTask,
            id
        })
    }

    const addTerm = (id, term) => {
        dispatch({
            type: types.addTerm,
            id,
            term
        })
    }

    const removeTerm = (id) => {
        dispatch({
            type: types.removeTerm,
            id
        })
    }

    return (
        <ListContext.Provider
        value={{
            ...state,
            setList,
            addTask,
            doneToggle,
            setTask,
            editTaskValue,
            addStep,
            removeStep,
            removeTask,
            addTerm,
            removeTerm
        }}
        >
            { children }
        </ListContext.Provider>
    )
}

export default ListState