import '../../styles/global.scss'

import ProgressBar from './progress/progress'
import TaskList from './task/task'
import { useState, useEffect, useContext, useRef } from 'react'
import TaskModal from './taskmodal/taskmodal'
import { useLocalStorage, useWindowDimensions } from '../services/services'
import Timer from './timer/timer'
import Remark from './remark/remark'
import Facts from './facts/facts'
import Chart from './chart/chart'
import { ThemeContext } from '../theme/ThemeProvider'
import { IconSelector } from '../../assets/icons/icons'
import ThemeBtn from '../interface/buttons/themebtn'
import CategoryDeleteBtn from '../interface/buttons/categorydeletebtn'

export default function Content({ burgerIsTogle, setBurgerTogle, target, setTarget, categories, changeCategories, toggleTarget }) {
    const [active, setActive] = useState(false)
    const [task, setTask] = useState('')
    const [category, setCategory] = useState('')
    const [newTask, setNewTask] = useLocalStorage('tasks', [])
    const [createdTask, incTask] = useLocalStorage('createdTask', 0)
    const [deletedTask, decTask] = useLocalStorage('deletedTask', 0)
    const [complitedTask, countTask] = useLocalStorage('complitedTask', 0)
    const warningRef = useRef(null)
    const { type } = useContext(ThemeContext)
    const { width } = useWindowDimensions()

    useEffect(() => {
        if (categories.length >= 1) {
            warningRef.current.classList.remove('show')
        }
    }, [categories.length])

    const addTask = (time) => {
        const id = Math.floor(Math.random() * 99999999999999)

        if (task.length > 49) {
            setTask(`${task.slice(0, 50)}...`)
        }

        const newArr = {
            id: id,
            category: category,
            task: task,
            complited: false,
            time: `${time}`,
            created: Date(Date.now()).slice(0, 3),
            complitedData: ''
        }

        setNewTask([...newTask, newArr])
    }

    return (
        <section className="content">
            <div className='content__container _container'>
                <div className='content__body'>
                    <div className='content__header'>
                        <button className="content__btn" onClick={() => {
                            if (categories === undefined || categories.length === 0) {
                                warningRef.current.classList.add('show')
                            } else {
                                setActive(true)
                            }
                        }}>
                            <IconSelector id={'circle-plus'} />
                            <span>Новая задача</span>
                        </button>
                        {width >= 768 ?
                            <>
                                <ThemeBtn />
                                <div className={type ? 'content__user' : 'content__user dark'}>
                                    <h3>Хорошего дня</h3>
                                    <div className='content__user-ico'>

                                    </div>
                                </div>
                            </> :
                            <div className={burgerIsTogle ? 'content__burger animated' : 'content__burger'}
                                onClick={() => {
                                    setBurgerTogle(!burgerIsTogle)
                                }}>
                                <span></span>
                            </div>}
                    </div>
                    <div className='content__content'>
                        <div className='content__tasks'>
                            {width >= 768 ? null : <Timer />}
                            <ProgressBar
                                complitedTask={complitedTask}
                                newTask={newTask}
                                createdTask={createdTask}
                                deletedTask={deletedTask}
                                incTask={incTask}
                                decTask={decTask}
                                countTask={countTask}
                                style={width >= 768 ? null : { marginTop: '30px' }} />
                            <TaskList
                                categories={categories}
                                complitedTaskN={complitedTask}
                                countTask={countTask}
                                deletedTask={deletedTask}
                                decTask={decTask}
                                target={target}
                                newTask={newTask}
                                setNewTask={setNewTask} />
                            <CategoryDeleteBtn
                                categories={categories}
                                setNewTask={setNewTask}
                                changeCategories={changeCategories}
                                setTarget={setTarget}
                                toggleTarget={toggleTarget}
                                target={target}
                                newTask={newTask} />
                        </div>
                        <div className='content__inf'>
                            {width >= 768 ? <Timer /> : null}
                            <Remark
                                newTask={newTask} />
                            <Facts />
                            <Chart
                                newTask={newTask} />
                        </div>
                    </div>
                    <span ref={warningRef} className='btn-warning'>Создайте категория</span>
                </div>
            </div>
            <TaskModal
                createdTask={createdTask}
                incTask={incTask}
                addTask={addTask}
                task={task}
                category={category}
                setTask={setTask}
                setCategory={setCategory}
                setNewTask={setNewTask}
                active={active}
                setActive={setActive}
                categories={categories}
            />
        </section>
    )
}