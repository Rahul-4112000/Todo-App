import './Todo.css';
import Tasks from '../Components/Tasks';
import CompletedTask from '../Components/CompletedTask'
import { AiOutlineHome } from 'react-icons/ai'
import { IoAddSharp } from "react-icons/io5";
import { BiCircle, BiSortAlt2, BiSort } from "react-icons/bi";
import { AiOutlineBars, AiOutlineDown } from "react-icons/ai";
import { HiOutlineStar } from "react-icons/hi"
import { BsArrowUp } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import { useEffect, useState, useRef } from 'react';
import sunset from '../Assets/images/sunset.jpg'
import iceMountain from '../Assets/images/iceMountain.jpg';
import thunder from '../Assets/images/thunder.jpg';
import checklist from '../Assets/images/checklist.png';

const getAllTaskfromLS = () => {
    const data = localStorage.getItem('allTask');
    if (data)
        return JSON.parse(data);
    else
        return [];
}

const getCompletedTaskfromLS = () => {
    const data = localStorage.getItem('completedTask');
    if (data)
        return JSON.parse(data);
    else
        return [];
}

function Todo() {

    const [task, setTask] = useState({
        taskName: '',
        importance: '0',
        circleFill: false,
        Addtransition: true,
        editmode: false
    });
    const [allTask, setallTask] = useState(getAllTaskfromLS);
    const [completedTask, setcompletedTask] = useState(getCompletedTaskfromLS);

    const [icon, setIcon] = useState(false);
    const [isTaskHide, setIsTaskHide] = useState(false);
    const [isColorPaletteOff, setColorPalette] = useState(false)
    const [listContainer, setListContainer] = useState(false);
    const [importanceLabelOn, setImportanceLabel] = useState(false);
    const [alphabeticLabelOn, setAlphabeticLabel] = useState(false);
    const [reverseSortImportance, setReverseSortImportance] = useState(false);
    const [reverseSortAlphabetic, setReverseSortAlphabetic] = useState(false)
    const [deleteIconColor, setDeleteIconColor] = useState('lightseagreen');

    const { taskName, circleFill, editmode } = task;

    const taskDataHandler = (Key) => (event) => {
        if (event.target.value !== 'Remove All')
            setTask({ ...task, [Key]: event.target.value });
        else {
            localStorage.clear();
            localStorage.clickcount = 0;
            setcompletedTask(getAllTaskfromLS);
            setallTask(getAllTaskfromLS);
        }
    }

    const menuRef = useRef();

    const sortingImportance = (isReverserSorting, taskData, setTaskData) => {
        const High = taskData.filter((obj) => parseInt(obj.importance) === 3);
        const Medium = taskData.filter((obj) => parseInt(obj.importance) === 2);
        const Low = taskData.filter((obj) => parseInt(obj.importance) === 1);
        const NotImportant = taskData.filter((obj) => parseInt(obj.importance) === 0);

        if (isReverserSorting)

            setTaskData([...NotImportant, ...Low, ...Medium, ...High]);

        else

            setTaskData([...High, ...Medium, ...Low, ...NotImportant]);
    }

    const sortingAlphabetically = (isReverseSorting, taskData, setTaskData) => {

        taskData.sort((a, b) => {

            if (isReverseSorting) {

                if (a.taskName.toLowerCase() < b.taskName.toLowerCase())

                    return 1;

                return -1;
            }

            else {

                if (a.taskName.toLowerCase() < b.taskName.toLowerCase())

                    return -1;

                return 1;

            }

        });
        setTaskData(taskData);

    }

    const segregation = (arrayofTask, setArrayofTask) => {

        if (alphabeticLabelOn)

            sortingAlphabetically(reverseSortAlphabetic, arrayofTask, setArrayofTask);

        else

            sortingImportance(reverseSortImportance, arrayofTask, setArrayofTask);
    }

    const changeValueOfCircleFill = (Id, booleanValue) => {

        setallTask(allTask.map((task) => {
            if (task.id === Id)
                return { ...task, circleFill: booleanValue }
            return task;
        }));
    }

    const removeCircleFill = (Id, booleanValue) => {

        setcompletedTask(completedTask.map((task) => {
            if (task.id === Id)
                return { ...task, circleFill: booleanValue }
            return task;
        }));
    }

    const hideRenamingPendingTask = (id, booleanValue) => {

        const temp = allTask.map((task) => {
            if (task.id === id)
                return { ...task, editmode: booleanValue }
            return task;
        });

        setallTask(temp);

    }

    const hideRenamingCompletedTask = (id, booleanValue) => {

        setcompletedTask(completedTask.map((task) => {
            if (task.id === id)
                return { ...task, editmode: booleanValue }
            return task
        }));

    }

    const renamePendingTask = (id) => (event) => {

        event.preventDefault();

        setallTask ( allTask.map((task) => {
            if (task.id === id)
                return { ...task, taskName: event.target[0].value, editmode:false }
            return task;
        }));

    }

    const renameCompletedTask = (id) => (event) => {

        event.preventDefault();

        setcompletedTask(completedTask.map((task) => {
            if (task.id === id)
                return { ...task, taskName: event.target[0].value, editmode:false }
            return task;
        }));

    }

    const deletefromUncompletedTask = (id) => {
        setallTask(allTask.filter((task) => task.id !== id))
    }

    const removefromUncompletedTask = (id) => {

        const newCompletedTask = allTask.filter((Task) => Task.id === id);

        const tempCompletedTask = [...newCompletedTask, ...completedTask];

        segregation(tempCompletedTask, setcompletedTask);

        setallTask(allTask.filter((Task) => Task.id !== id));
    }

    const deletefromCompletedTask = (id) => {
        setcompletedTask(completedTask.filter((task) => task.id !== id));
    }

    const removeFromCompletedTask = (id) => {

        setcompletedTask(completedTask.filter((Task) => Task.id !== id));

        const uncompletedTask = completedTask.filter((Task) => Task.id === id);

        const tempAllTask = [...uncompletedTask, ...allTask];

        tempAllTask.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            else return 0;
        })

        segregation(tempAllTask, setallTask);
    }

    const labelDisplayHandler = (checkLabel, setLabel, removeLabel) => {
        if (checkLabel) {
            removeLabel(false);
            setLabel(true)
        }
        else
            setLabel(true);
    }

    const booleanValueHandler = (booleanValue, setState) => {
        setState(booleanValue);
    }



    const submit = (eventOfSubmit) => {

        eventOfSubmit.preventDefault();

        if (taskName.trim() === '') {
            return null;
        }

        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }
        const Id = localStorage.clickcount;

        task.id = Id;

        const tempAllTask = [...allTask, task];

        if (alphabeticLabelOn)
            sortingAlphabetically(reverseSortAlphabetic, tempAllTask, setallTask)
        else
            sortingImportance(reverseSortImportance, tempAllTask, setallTask);

        setTask({ ...task, taskName: '' });

    }

    const changeBackgroundColor = (color) => {

        setDeleteIconColor(color);

        if (document.querySelector('body').style.backgroundImage) {
            document.querySelector('body').style.backgroundImage = '';
            document.querySelector('body').style.backgroundColor = color;

        }
        else
            document.querySelector('body').style.backgroundColor = color;
    }

    const changeBackgroundImage = (image) => {
        setDeleteIconColor("lightseagreen");
        if (document.querySelector('body').style.backgroundColor) {
            document.querySelector('body').style.backgroundColor = '';
            document.querySelector('body').style.backgroundImage = `url(${image})`;
        }
        else
            document.querySelector('body').style.backgroundImage = `url(${image})`;

    }

    useEffect(() => {
        localStorage.setItem('allTask', JSON.stringify(allTask));
    }, [allTask]);

    useEffect(() => {
        localStorage.setItem('completedTask', JSON.stringify(completedTask));
    }, [completedTask]);


    const eventHandler = (e) => {
        if (!menuRef.current.contains(e.target))
            setListContainer(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', eventHandler);
        return () => document.removeEventListener;
    })

    const iconHandler = () => {
        setIcon(!icon);
    }

    const onEventofImportance = () => {

        sortingImportance(false, allTask, setallTask);
        if (completedTask.length > 0)
            sortingAlphabetically(false, completedTask, setcompletedTask);
        labelDisplayHandler(alphabeticLabelOn, setImportanceLabel, setAlphabeticLabel);
        booleanValueHandler(false, setListContainer);

    }

    const onEventofAlphabetic = () => {

        sortingAlphabetically(false, allTask, setallTask)
        labelDisplayHandler(importanceLabelOn, setAlphabeticLabel, setImportanceLabel);
        booleanValueHandler(false, setListContainer);
    }

    const onEventofLabel = (isReverseSorting, setReverseSort, sorting) => {

        setReverseSort(isReverseSorting)
        sorting(isReverseSorting, allTask, setallTask);
        if (completedTask.length > 0)
            sorting(isReverseSorting, completedTask, setcompletedTask);
    }

    const onCloseLabel = (setLabel) => {

        booleanValueHandler(false, setLabel);
        sortingImportance(false, allTask, setallTask);
        if (completedTask.length > 0)
            sortingImportance(false, completedTask, setcompletedTask);

    }

    const removeClass = (Id) => {

        setallTask(allTask.map((task) => {
            if (task.id === Id)
                return { ...task, Addtransition: false }
            return task
        }));

    }


    const onLeaving = "Add a Task";
    const onEntering = "Try typing 'Pay utilities bill by Friday 6pm'";

    return (
        <div className='container center-x'>
            <div className='container-wrapper center-x'>
                <div className='flex-container'>

                    <div className='taskIcon'>
                        <AiOutlineHome className='icon' />
                        <h2>Tasks</h2>
                    </div>

                    <div className='drop-down-icon' ref={menuRef} >

                        <div className='colorPicker' onClick={() => booleanValueHandler(!listContainer, setListContainer)} ><AiOutlineBars /></div>

                        <div className={`list-option-container ${listContainer ? "active" : "deactive"}`} >

                            <div className='sort' onClick={() => { booleanValueHandler(!isColorPaletteOff, setColorPalette) }}>
                                <div className='sort-icon'> <BiSortAlt2 /> </div>
                                <div className='sort-text'> Sort by </div>
                                <div className={`sort-by-icon ${isColorPaletteOff ? "rotate-cw" : null}`} ><AiOutlineDown /></div>
                            </div>

                            <hr />

                            <div className={`sort-list ${isColorPaletteOff ? "active" : "deactive"}`}>
                                <div className='sort' onClick={() => { onEventofImportance() }}>
                                    <div className='sort-icon '> <HiOutlineStar /></div>
                                    <div className='sort-text'>Importance</div>
                                </div>
                                <div className='sort' onClick={() => { onEventofAlphabetic() }} >
                                    <div className='sort-icon'><BiSort /></div>
                                    <div className='sort-text'>Alphabetically</div>
                                </div>
                            </div>

                            <div className={`color-palette-container ${isColorPaletteOff ? "deactive" : "active"}`} >
                                <div className='color-palette-title'>Theme</div>
                                <div className='color-palette'>
                                    <div onClick={() => { changeBackgroundColor("lightseagreen") }} className='color sea-green'></div>
                                    <div onClick={() => { changeBackgroundColor("lightblue") }} className='color light-blue'></div>
                                    <div onClick={() => { changeBackgroundColor("#C1BB69") }} className='color dark-khaki'></div>
                                    <div onClick={() => { changeBackgroundColor("#e57373") }} className='color light-coral'></div>
                                    <div onClick={() => { changeBackgroundColor("lightgreen") }} className='color light-green'></div>
                                    <div onClick={() => { changeBackgroundColor("#00bcd4") }} className='color slate-grey'></div>
                                    <div onClick={() => { changeBackgroundImage(thunder) }} className='color'><img src={thunder} alt="lakeImg" /></div>
                                    <div onClick={() => { changeBackgroundImage(iceMountain) }} className='color'><img src={iceMountain} alt="leafImg" /></div>
                                    <div onClick={() => { changeBackgroundImage(sunset) }} className='color'> <img src={sunset} alt="sunset" /></div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='sort-label-container'>

                    <div className={`sort-label-wrapper ${importanceLabelOn ? "label-active" : "label-deactive"}`} >

                        <div className="sort-label" onClick={() => { onEventofLabel(!reverseSortImportance, setReverseSortImportance, sortingImportance) }} >

                            <div className={`arrow-icon ${reverseSortImportance ? "rotate-arrow-icon" : null}`}><BsArrowUp /></div>
                            <div className='sort-label-text'>Sorted by importance</div>
                        </div>


                        <div className='sort-label-cross-icon' onClick={() => { onCloseLabel(setImportanceLabel) }}><RxCross2 /></div>

                    </div>

                    <div className={`sort-label-wrapper ${alphabeticLabelOn ? "label-active" : "label-deactive"}`} >

                        <div className="sort-label" onClick={() => { onEventofLabel(!reverseSortAlphabetic, setReverseSortAlphabetic, sortingAlphabetically) }}>

                            <div className={`arrow-icon ${reverseSortAlphabetic ? "rotate-arrow-icon" : null}`} ><BsArrowUp /></div>
                            <div className='sort-label-text'>Sorted Alphabetically</div>

                        </div>

                        <div className='sort-label-cross-icon' onClick={() => { onCloseLabel(setAlphabeticLabel) }} ><RxCross2 /></div>

                    </div>

                </div>

                <div className='tasks-list'>

                    {
                        allTask.length === 0 && completedTask.length === 0 ?
                            <div className='no-task'>
                                <img src={checklist} alt="checklist-svg"></img>
                                <p>Add Your First Todo</p>
                            </div>
                            : null
                    }
                    <Tasks
                        allTask={allTask}
                        removefromUncompletedTask={removefromUncompletedTask}
                        changeValueOfCircleFill={changeValueOfCircleFill}
                        deletefromUncompletedTask={deletefromUncompletedTask}
                        deleteIconColor={deleteIconColor}
                        hideRenamingPendingTask={hideRenamingPendingTask}
                        renamePendingTask={renamePendingTask}
                    />
                    {
                        completedTask.length > 0 ?
                            <div className="completed" onClick={() => { setIsTaskHide(!isTaskHide) }}>
                                <span className={`downArrowIcon ${isTaskHide ? "rotateDownArrowIcon" : null}`}><AiOutlineDown /></span>
                                <span>Completed</span>
                                <span className='length' >{completedTask.length}</span>
                            </div> : null
                    }

                    <div className={`${isTaskHide ? "hideCompletedTask" : "completed-tasks"}`}>
                        <CompletedTask
                            completedTask={completedTask}
                            removeFromCompletedTask={removeFromCompletedTask}
                            removeCircleFill={removeCircleFill}
                            deletefromCompletedTask={deletefromCompletedTask}
                            deleteIconColor={deleteIconColor}
                            hideRenamingCompletedTask={hideRenamingCompletedTask}
                            renameCompletedTask={renameCompletedTask}
                        />
                    </div>

                </div>

                <form className='add-newtask' onSubmit={submit}>
                    <div className='row'>
                        {
                            icon ? <BiCircle className='circleIcon' /> : <IoAddSharp className='addIcon' />
                        }
                        <input type="text" placeholder={icon ? onEntering : onLeaving} value={taskName} onChange={taskDataHandler("taskName")} onBlur={iconHandler} onFocus={iconHandler} ></input>

                        <div className='selection'>
                            <select onChange={taskDataHandler("importance")} >
                                <option>Select Priority</option>
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                                <option value={"Remove All"}>Remove All</option>
                            </select>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Todo;
