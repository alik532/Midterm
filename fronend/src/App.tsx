import './App.css'
import { useState, useEffect } from 'react'
import 'react'
import Task from './Task'
import axios from 'axios'

function App() {

  const [tasks, setTasks] = useState<Array<{id: number, text: string}>>()
  const [newTaskText, setNewTaskText] = useState("")


  const fetchTasks = () => {
    axios.get("http://localhost:8080/api/v1/tasks").then(respose => {
      setTasks(respose.data)
    })
  }

  const updateTask = (id: number, text: string) => {
    axios.put("http://localhost:8080/api/v1/tasks", {id: id, text: text}).then(response => console.log(response))
    fetchTasks()
    setTimeout(() => fetchTasks(), 500)
  }

  useEffect(() => {
    fetchTasks();  
  }, [])

  const addTask = () => {
    axios.post("http://localhost:8080/api/v1/tasks", {text: newTaskText}).then(response => console.log(response))
    setNewTaskText("") 
    console.log("task added")
    setTimeout(() => fetchTasks(), 300)
  }

  const deleteTask = (id: number) => {
		axios.delete("http://localhost:8080/api/v1/tasks", {params: {id}}).then(response => console.log(response))
    setTimeout(() => fetchTasks(), 500)
	}

  if (tasks)
    return (
    <div>
      <div className='add'>
        <input type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)}/>
        <button className='' onClick={addTask}>Add task</button>
      </div>
      <div className='list'>
        {tasks.map(task => 
          <Task updateTask={updateTask} id={task.id} deleteTask={() => deleteTask(task.id)} text={task.text}/>  
        )}
      </div>
    </div>
    )
  else 
          return <div>Error</div>
}

export default App
