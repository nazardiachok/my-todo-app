 import  {useGetTodosByTitleQuery, useChangeTodoMutation, useDeleteTodoMutation}  from './api/api';
 import  { useState } from 'react';
import './App.css';



function App() {
  const { data, error, isLoading } = useGetTodosByTitleQuery();
  const [input, setInput] =useState("");
  const [search, setSearch] = useState("");
  const [changeTodo] = useChangeTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
 

  function onSubmitFunc(event){
    event.preventDefault();
    setSearch(input);
  }

  
  
  console.log(data);
  /* const filtered = data.filter(item => search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search));
  console.log(filtered); */

  return (
    <div className="App">

      <form onSubmit={onSubmitFunc}>
        <input type="text" onChange={(e)=> setInput(e.target.value)}
         />
         <button type="submit">Submit</button>
      </form>
      
      
      
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? 
      (
        <div>
          
          {/* {filtered.length !== 0 ? filtered.map(item=> <div key={item.id}> <p>{item.id}, {item.title}</p> </div>):<p>Nichts gefunden, starte deine Suche bitte neu</p>} */}

          {(data.filter(item => search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search)))
          .length !== 0 ?
          (data.filter(item => search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search)).map(item=> 
              <div key={item.id}>  <button onClick={()=>deleteTodo({id: item.id})}>Delete</button>
              <div> <input type="checkbox" /* checked={item.completed} */ id={item.id} onChange={() => changeTodo({ ...item, completed: !item.completed})} ></input> <label htmlFor={item.id}>{item.name}</label></div> </div> ))
              : 
              <p>Sorry, es gibt nichts</p>}
        </div>
      ) : null}
      
    </div>
  );
}

export default App;
