import {db} from './firebase'
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc} from "firebase/firestore"; 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from './redux/reducers/tasks';
import { useForm } from 'react-hook-form';
import {BsFillTrashFill} from 'react-icons/bs';
import {MdDoneOutline} from 'react-icons/md';
import {FaStar} from 'react-icons/fa';
import Vanta from "./Vanta";
import './App.css';

function App() {

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const tasksCount = useSelector((state) => state.tasks.tasksCount);
  const {register, handleSubmit, reset} = useForm();


    function data(date) {
      return new Intl.DateTimeFormat('en-En', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
      }).format(new Date(date))
    }
    
    useEffect(() => {
      console.log('Get Item')
      getAll()
    }, [])

    const getAll = () => {
     getDocs(collection(db, "tasks"))
    .then((res) => dispatch(getData(res.docs.map(i => ({...i.data(), id:i.id})))));
    }

    const addTask = async (data) => {
     console.log('Add Item', data)
     await addDoc(collection(db, 'tasks'), {
        ...data,
        important: false,
        done: false,
        isChange: false,
        time: new Date()
      })
      getAll()
      reset()
    }


  return (
    <div className="App">
      <Vanta/>
      <div className="content">
          <div>
              <h2 className='data__title'>{data(new Date())}</h2>
              <h1 className='title'>Todo List</h1>
              <span className='count'> {tasksCount} tasks  to done {tasks.filter((item) => item.done).length} </span>
          </div>

          <form className='form' onSubmit={handleSubmit(addTask)}>
              <input {...register('text')} placeholder='Add Tasks'
               maxLength='15' minLength={4} className='input' required type="text" autoFocus/>
              <button className='add__btn' type='submit'>Add</button>
          </form>

          <ul className='list'>
             
             { tasks.map((item) => (

              <li className='item' key={item.id}>
                  <span>{new Date(item.time.seconds*1000).toLocaleDateString()}</span>
                  <span className='text'>{item.text}</span>
                  <div className='list__btns'>
                      <button style={{background: item.done ? 'royalblue' : ''}} className='btn' type={"button"} onClick={async () => {
                          await updateDoc(doc(db, 'tasks', item.id), {
                          ...item,
                          done: !item.done
                          })
                          getAll()
                      }}><MdDoneOutline/></button>

                      <button style={{background: item.important ? 'gold' : ''}} className='btn' type='button' onClick={async () => {
                          await updateDoc(doc(db, 'tasks', item.id), {
                          ...item,
                          important: !item.important
                         })
                         getAll() 
                      }}><FaStar/></button>

                      <button className='btn' type='button' onClick={async () => {
                         await deleteDoc(doc(db, 'tasks', item.id))
                         getAll()
                      }}><BsFillTrashFill/></button>
                  </div>
              </li>

             ))}

          </ul>

          <h3 className='title_footer'>Options</h3>

          <div className='footer__btns'>
              <div className='footer__btns-left'>
                  <button className='btn__footer' type='button'>All</button>
                  <button  className='btn__footer' type='button'><MdDoneOutline/></button>
                  <button className='btn__footer' type='button'><FaStar/></button>
              </div>
              <div className='footer__btns-right'>
                  <button className='delete__all-btn' type='button'
                     onClick={ async () => {
                        await tasks.forEach((item) => {
                        deleteDoc(doc(db, 'tasks', item.id))
                      })
                      getAll()
                   }}>Delete All <MdDoneOutline/></button>
              </div>
          </div>
       </div>
    </div>
  );
}

export default App;
