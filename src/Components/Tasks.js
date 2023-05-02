import { BiCircle } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti'
import './Tasks.css';



function Tasks({ allTask, removefromUncompletedTask, changeValueOfCircleFill, deletefromUncompletedTask, deleteIconColor, hideRenamingPendingTask,renamePendingTask }) {

  return (

    allTask.map((singleTask, index) =>

      <div className='task' key={index}>

        <span className='circle-icon' onMouseUp={() => removefromUncompletedTask(singleTask.id)} onMouseDown={() => { changeValueOfCircleFill(singleTask.id, true) }} onMouseLeave={() => changeValueOfCircleFill(singleTask.id, false)} >
          {
            singleTask.circleFill ? <AiFillCheckCircle /> : < BiCircle />
          }
        </span>

        <label onDoubleClick={() => { hideRenamingPendingTask( singleTask.id, true ) }}  className={`label ${ singleTask.editmode && 'd-none'}`} >{singleTask.taskName} </label>

        <form className={ singleTask.editmode ? 'renamed-form' : 'd-none'  } onSubmit={ renamePendingTask(singleTask.id) }>
          <input onBlur={() => { hideRenamingPendingTask(singleTask.id , false ) } } type='text' defaultValue={singleTask.taskName} ></input>
        </form>

        <span className={`delete`} style={{ color: deleteIconColor }} onClick={() => { deletefromUncompletedTask(singleTask.id) }}><TiDelete /></span>

      </div>
    )
  );

}

export default Tasks;