import { useEffect, useState } from 'react'
import Navigation from './Component/Navigation'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  // const data=[{todo:""}]
  // const [todo, setTodo] = useState('')
  // const [todos, setTodos] = useState(todo)

  
  // const handleAdd = () => {
  //   setTodos([...todo, { todo : todo}])
  //   // setTodo("")
  //   console.log(todos)
  // }

  // const handleChange = (e) => {
  //   setTodo(e.target.value)
  //   // console.log(todo)
  // }

  const [todo,setTodo]=useState('')
  const data=[{todo :todo}]
  const [todos,setTodos]=useState(data)
  const [showFinished,setShowFinished]=useState(true)

  useEffect(()=>{
    let todoString=localStorage.getItem('todos')
    if(todoString){
      let todos=JSON.parse(localStorage.getItem('todos'))
      setTodo(todos)
    }
  },[])

  const handleCheck=(e)=>{
    let id=e.target.name
    console.log(id)
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    console.log(index)
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
  }

  const handleEdit = (e) => {
    let id=e.target.name
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
   }

   const saveToLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
   }

   const toggleFinished=(e)=>{
    setShowFinished(!showFinished)
   }

  const handleDelete = (e) => {
    let id=e.target.name;
    let newTodos=todos.filter(item=>{
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
   }

  return (
    <>
      <Navigation />
      <div className='md:container md:w-1/2 mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-full'>
        <h1 className='font-bold text-center text-2xl'>URTask - Manage your task at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input type="text" value={todo} onChange={(e)=>{setTodo(e.target.value)}} name="todo" id="" className='px-3 py-2 rounded-lg border-3 border-violet-700 outline-2 outline-violet-800 w-full ' /><br />
          <button type='submit' className='bg-violet-800 hover:bg-violet-950 text-white p-2 rounded-xl my-1 px-3 font-bold disabled:bg-violet-500' onClick={()=>{setTodos(d=>[...d,{todo: todo, id:uuidv4(), isCompleted:false}])
           setTodo="" 
           saveToLS() }} disabled={todo.length<=3}>Save</button>
        </div>
        <input type="checkbox" checked={showFinished} onChange={toggleFinished} />Show Finished

        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
        {todos.length===0 && <div>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished|| !item.isCompleted) && <div className="todo flex md:w-1/2 my-3 justify-between border-1 border-red-600" key={item.id}>
                <input type="checkbox" checked={todo.isCompleted} onChange={handleCheck} name={item.id} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                <div className="buttons flex">
                  <button name={item.id} onClick={handleEdit} className='bg-violet-800 hover:bg-violet-950 text-white p-1 rounded-xl  px-3 mr-3 font-bold'><FiEdit /></button>
                  <button name={item.id}  onClick={handleDelete} className='bg-violet-800 hover:bg-violet-950 text-white p-1 rounded-xl  px-3 font-bold'><AiOutlineDelete /></button>
                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  )
}

export default App
