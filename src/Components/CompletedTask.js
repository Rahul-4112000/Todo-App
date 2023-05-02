// import './CompletedTask.css'
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';
import { TiDelete } from 'react-icons/ti'

function CompletedTask({ completedTask, removeFromCompletedTask, removeCircleFill, deletefromCompletedTask, deleteIconColor,  renameCompletedTask, hideRenamingCompletedTask }) {

    return (
        completedTask.map((singleTask, index) =>

            <div className="task" key={index}>

                <span className='circle-icon' onMouseUp={() => removeFromCompletedTask(singleTask.id)} onMouseDown={() => removeCircleFill(singleTask.id, false)} onMouseLeave={() => removeCircleFill(singleTask.id, true)} >
                    {
                        singleTask.circleFill ? <AiFillCheckCircle /> : <BiCircle />
                    }
                </span>

                <label  className={`label ${ singleTask.editmode && 'd-none'}`} onDoubleClick={() => { hideRenamingCompletedTask( singleTask.id, true ) }} ><s>{singleTask.taskName}</s></label>

                <form className={singleTask.editmode ? 'renamed-form' : 'd-none'} onSubmit={ renameCompletedTask(singleTask.id)} >
                    <input onBlur={() => { hideRenamingCompletedTask(singleTask.id, false) }} type='text' defaultValue={singleTask.taskName} ></input>
                </form>

                <span className='delete' style={{ color: deleteIconColor }} onClick={() => { deletefromCompletedTask(singleTask.id) }}><TiDelete /></span>
            </div>
        )

    );
}

export default CompletedTask;