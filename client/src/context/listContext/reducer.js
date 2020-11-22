import * as types from './types'

export const initialState = {
    list: {},
    chosenTask: {}
}

export const reducer = (state, action) => {
    switch (action.type) {
        case types.setList:
            return {
                ...state,
                list: action.list
            }
        case types.addTask:
            return {
                ...state,
                list: { ...state.list, tasks: [ ...state.list.tasks, action.task] }
            }
        case types.deleteTask:
            return {
                ...state,
                list: { ...state.list, tasks: state.list.tasks.filter(task => task._id !== action.id) }
            }
        case types.doneToggle:
            return {
                ...state,
                chosenTask: { ...state.chosenTask, done: !state.chosenTask.done },
                list: {
                    ...state.list,
                    tasks: state.list.tasks.map(task => {
                        if (task._id === action.id) {
                            return {...task, done: !task.done}
                        } else return task
                    })
                }
            }
        case types.setTask:
            return {
                ...state,
                chosenTask: action.task
            }
        case types.editTaskValue:
            return {
                ...state,
                chosenTask: { ...state.chosenTask, task: action.value },
                list: {
                    ...state.list,
                    tasks: state.list.tasks.map(task => {
                        if (task._id === action.id) {
                            return {...task, task: action.value}
                        } else return task
                    })
                }
            }
        case types.addStep:
            return {
                ...state,
                chosenTask: {
                    ...state.chosenTask,
                    steps: [ ...state.chosenTask.steps, { ...action.step } ]
                }
            }
        case types.deleteStep:
            return {
                ...state,
                chosenTask: {
                    ...state.chosenTask,
                    steps: state.chosenTask.steps.filter(step => step._id !== action.id)
                }
            }
        case types.addTerm:
            return {
                ...state,
                chosenTask: { ...state.chosenTask, term: action.term },
                list: {
                    ...state.list,
                    tasks: state.list.tasks.map(task => {
                        if (task._id === action.id) {
                            return {...task, term: action.term}
                        } else return task
                    })
                }
            }
        case types.removeTerm:
            return {
                ...state,
                chosenTask: { ...state.chosenTask, term: null },
                list: {
                    ...state.list,
                    tasks: state.list.tasks.map(task => {
                        if (task._id === action.id) {
                            return {...task, term: null}
                        } else return task
                    })
                }
            }
        default:
            return state
    }
}
