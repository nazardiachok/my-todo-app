 import  {useGetTodosByTitleQuery, useChangeTodoMutation, useDeleteTodoMutation, useAddTodoMutation}  from './api/api';
 import  { useState } from 'react';
 import  styled from 'styled-components';
import './App.css';



function App() {
  const { data, error, isLoading } = useGetTodosByTitleQuery();
  const [input, setInput] =useState("");
  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [changeTodo] = useChangeTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();
 

  function onSubmitFunc(event){
    event.preventDefault();
    setSearch(input);
  }
  function onAddTodo(event){
    event.preventDefault();
    addTodo({ userId:1, title: newTodo, completed: false})
  }

  
  
  console.log(data);
  /* const filtered = data.filter(item => search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search));
  console.log(filtered); */

  return (
    <div className="App">

      <form onSubmit={onSubmitFunc}>
      <label htmlFor="search">Search </label> 
        <input type="text" id="search" onChange={(e)=> setInput(e.target.value)}
         />
         
         <button type="submit"> Submit</button>
      </form>
      
      <form onSubmit={onAddTodo}>
      <label htmlFor="add">Create new Todo </label> 
        <input type="text" id="add" onChange={(e)=> setNewTodo(e.target.value)}
         />
         <button type="submit"> Add new todo</button>
      </form>
      
      
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? 
      (
        <div>
          
          {/* {filtered.length !== 0 ? filtered.map(item=> <div key={item.id}> <p>{item.id}, {item.title}</p> </div>):<p>Nichts gefunden, starte deine Suche bitte neu</p>} */}

          {(data.filter(item => search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search)))
          .length !== 0 ?
          (data.filter(item => search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search)).map(item=> 
              <div key={item.id}>  <button onClick={()=>deleteTodo({id: item.id})}>Delete</button>
              <div> <input type="checkbox" /* checked={item.completed} */ id={item.id} onChange={() => changeTodo({ ...item, completed: !item.completed})} ></input> <label htmlFor={item.id}><Styled completed={item.completed}>{item.title}</Styled></label></div> </div> ))
              : 
              <p>Sorry, es gibt nichts</p>}
        </div>
      ) : null}
      
    </div>
  );
}

export default App;

const Styled = styled.p`
text-decoration: ${({completed}) => (completed ?  "line-through": "none")};
`