import { BiCircle } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti'
import './Tasks.css';


function Tasks({ allTask, removefromUncompletedTask, changeValueOfCircleFill, deletefromUncompletedTask, deleteIconColor, removeClass }) {


  console.log(allTask)

  return (
    allTask.map((singleTask,index) =>
      <div className={`task ${singleTask.Addtransition ? "normal" : null }`} key={index}>
        <span className='circle-icon' onMouseUp={()=> removefromUncompletedTask(singleTask.id) } onMouseDown={()=> { changeValueOfCircleFill(singleTask.id,true)} } onMouseLeave={()=>changeValueOfCircleFill(singleTask.id,false)} >
          {
            singleTask.circleFill ? <AiFillCheckCircle/> : < BiCircle />
          }
        </span>
        <label className='label'   >{singleTask.taskName} </label>
        <span className={`delete`} style={{color:deleteIconColor}} onClick={ () => { removeClass(singleTask.id); deletefromUncompletedTask(singleTask.id) } }><TiDelete/></span>
      </div>
    )
  );

}

export default Tasks;