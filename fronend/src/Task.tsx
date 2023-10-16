import {FC} from 'react'
import 'react'
import {useState} from 'react'

const Task:FC<{text:string, deleteTask: ()=>void, updateTask: (id: number, text: string)=>void, id: number}> = ({text, deleteTask, id, updateTask}) => {

	const [isEditMode, setIsEditMode] = useState(false)
	const [editText, setEditText] = useState("")

  return (
	<div className='task'>
		<h4>{text}</h4>
		<div className='buttons'>
			<button className='done' onClick={deleteTask}>Done</button>
			<button onClick={() => setIsEditMode(prev => !prev)}>{!isEditMode ? 'Edit' : <img alt='' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png' width={20}/>}</button>
			{isEditMode && 
				<div className='editBar'>
					<input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}/>
					<button onClick={() => {updateTask(id, editText); setIsEditMode(false);setEditText("")}}><img width={20} src="https://www.freeiconspng.com/thumbs/check-tick-icon/black-check-tick-icon-4.png" alt="" /></button>
				</div>
			}
		</div>
	</div>
  )
}

export default Task