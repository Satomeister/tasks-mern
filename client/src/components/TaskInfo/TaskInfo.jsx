import React, {
    useContext,
    useRef
} from 'react'
import { RiDeleteBinLine, RiArrowRightSLine } from 'react-icons/ri'
import useHttp from '../../hooks/useHttp'
import { FaPlus } from 'react-icons/fa'
import ListContext from '../../context/listContext/listContext'
import useInput from '../../hooks/useInput'
import { toStyledDate } from '../../utils/date'
import { focus } from '../../utils/utils'
import EditTask from './EditTask'
import StepsLists from './StepsList'
import Term from './Term'
import SideListsContext from '../../context/listsCountContext/listsCountContext'
import { updateVar } from '../../utils/cssVars'

const TaskInfo = ({ listId, clearChosenTask }) => {
    const {
        list,
        chosenTask: task,
        doneToggle,
        editTaskValue,
        addStep,
        removeStep,
        removeTask,
        addTerm,
        removeTerm,
        setTask
    } = useContext(ListContext)
    const { decreaseTaskCount } = useContext(SideListsContext)
    const addRef = useRef(null)
    const { request } = useHttp()
    const stepInput = useInput()

    const addNewStep = async (e) => {
        e.preventDefault()
        try {
            const step = await request(`/task/${task._id}/step/add`, 'POST', { step: stepInput.value })
            addStep(step)
            stepInput.clear()
        } catch (e) { }
    }

    const deleteTask = async () => {
        try {
            await request(`/task/${task._id}/delete`, 'DELETE', { listId })
            removeTask(task._id)
            decreaseTaskCount(list)
            clearChosenTask()
        } catch (e) { }
    }

    const closeTaskInfo = () => {
        updateVar('--taskInfo-width', '0')
        setTask({})
    }

    if (Object.keys(task).length > 0) {
        return (
            <div className='taskInfo'>
                <div className='taskWrapper'>
                    <EditTask
                        task={task}
                        editTaskValue={editTaskValue}
                        doneToggle={doneToggle}
                    />

                    <StepsLists
                        task={task}
                        removeStep={removeStep}
                    />

                    <div className='addValue__wrapper'>
                        <FaPlus className='addValue__icon' onClick={() => {focus(addRef)}}/>
                        <form onSubmit={addNewStep}>
                            <input
                                {...stepInput.bind}
                                ref={addRef}
                                type="text"
                                placeholder='Add step'
                                required
                            />
                        </form>
                    </div>
                </div>

                <Term
                    task={task}
                    addTerm={addTerm}
                    removeTerm={removeTerm}
                />
                <div onClick={closeTaskInfo} className='close-block'>
                    <RiArrowRightSLine className='close-block__icon' size='1em'/>
                </div>
                <div className='bottom-block'>
                    <span className='bottom-block__text'>Created at {toStyledDate(task.date)}</span>
                    <RiDeleteBinLine onClick={deleteTask} className='bottom-block__icon' size='1.4em'/>
                </div>
            </div>
        )
    }
    return null
}

export default TaskInfo