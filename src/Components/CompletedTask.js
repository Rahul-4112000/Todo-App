// import './CompletedTask.css'
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti'

function CompletedTask({completedTask, removeFromCompletedTask, removeCircleFill, deletefromCompletedTask, deleteIconColor}) {
    return (
        completedTask.map((singleTask,index)=>
                  <div className="task" key={index}>
                      <div className='circle-icon' onMouseUp={()=>removeFromCompletedTask(singleTask.id)} onMouseDown={()=>removeCircleFill(singleTask.id,false)} onMouseLeave={()=>removeCircleFill(singleTask.id,true)} >
                    {
                        singleTask.circleFill ? <AiFillCheckCircle/> : <BiCircle/>
                    }
                      </div>
                      <label className='label' ><s>{singleTask.taskName}</s></label>
                      <span className='delete' style={{color:deleteIconColor}}  onClick={ () => { deletefromCompletedTask(singleTask.id)} }><TiDelete/></span>
                  </div>
        )  
      
    );
  }
  
  export default CompletedTask;