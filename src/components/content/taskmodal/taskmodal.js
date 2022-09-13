import '../../../styles/global.scss';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useContext, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeContext } from '../../theme/ThemeProvider';

export default function TaskModal ({categories, addTask, active, setActive, setTask, setCategory, category, task, createdTask, incTask}){
    const [value, setValue] = useState(Date.now());
    const refInput = useRef()
    const refWarn = useRef()
    const {type} = useContext(ThemeContext)

    const handleChange = (newValue) => {
        setValue(newValue)
    }

    const setDefault = () => {
        refInput.current.value = ''
        refInput.current.style.border = '1px solid rgba(40, 40, 70, 0.1)'
        refWarn.current.style.opacity = '0'
        setActive(false)
    }

    const categoriesName = categories.map((item, index) => {
        const {name} = item
        return (
            <option key={name} value={index}>{name}</option>
        )
    })

    return (
        <div className={active ? 'task-modal active' : 'task-modal'} onClick={() => setDefault()}>
            <div className={type ? 'task-modal__body' : 'task-modal__body dark'} onClick={(e) => e.stopPropagation()}>
                <form className='task-modal__form'>
                    <h4>Добавить новую задачу</h4>
                    <div className={type ? 'task-modal__inputs' : 'task-modal__inputs dark'}>
                        <div className='task-modal__task'>
                            <p>Что нужно сделать?</p>
                            <input
                                className='task-modal__input'
                                ref={refInput} 
                                onChange={e =>{ 
                                    setTask(e.target.value)
                                    if(e.target.value.length >= 50){
                                        e.target.style.border = '1px solid red'
                                        refWarn.current.style.opacity = '1'
                                    } else{
                                        e.target.style.border = '1px solid rgba(40, 40, 70, 0.1)'
                                        refWarn.current.style.opacity = '0'
                                    }
                                }}
                                type='text'/>
                            <p 
                                className='warning-task'
                                ref={refWarn}>
                                    Слишком длинное название задачи
                            </p>
                        </div>
                        <div className='task-modal__categories'>
                            <div className='task-modal__category-item'>
                                <p>Категория</p>
                                <select 
                                    className={type ? 'task-modal__select' : 'task-modal__select dark'}
                                    defaultValue='DEF'
                                    onChange={(e) => {
                                        setCategory(e.target.selectedOptions[0].text)
                                        }}>
                                        <option value='DEF' hidden>Выбрать</option>
                                        {categoriesName}
                                </select>
                            </div>
                            <div className='task-modal__category-item'>
                                <p>Когда?</p>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField  className='task-modal__when-input' {...params}/>}  
                                        onChange={handleChange} 
                                        value={value}/>
                                    </LocalizationProvider>
                            </div>
                            <div className='task-modal__category-item'>
                                <p>Приоритет</p>
                                <select defaultValue='DEF' className={type ? 'task-modal__select' : 'task-modal__select dark'}>
                                    <option value='DEF' hidden>Выбрать</option>
                                    <option value='hight'>Высокий</option>
                                    <option value='low'>Низкий</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='task-modal__btns'>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setDefault()
                            }} 
                            className='task-modal__btn-cnsl'>
                                Отменить
                        </button>
                        <button 
                            className='task-modal__btn-sbmt'
                            onClick={(e) => {
                                e.preventDefault()
                                if(category !== '' && task !==''){
                                    addTask(value)
                                    setDefault()
                                    incTask(++createdTask)
                                }else{
                                    console.log('Пустое значение')
                                }
                            }}>
                                Добавить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}