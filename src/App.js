import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";

//FILTER_MAP and FILTER_NAMES will never change in this app so they are declared out of the function body
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  //Callback prop function to get name of the task from Form component
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
  }

  //Getting the id of clicked item in Todo component and toggling the completed property of the item
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  //Getting the id of the item to be deleted from Todo component and then filtering tasks to get the remaining items
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  //Filtering the tasks by their completed:boolean property and creating Todo component instances with the given props
  const taskList = tasks.filter(FILTER_MAP[filter])
  .map( task => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
      />
    )
  );

  //Creating the filter buttons and giving it props and a callback prop for setting the state of filter
  const filterList = FILTER_NAMES.map( name => (
    <FilterButton key={name} name={name} setFilter={setFilter} />
  ));

  //Creating the list counter based on the status of the filter
  const status = filter === "All" ? "in total" : filter === "Active" ? "active" : "completed";
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} ${status}`;

  return (
    <div className="container">
      <h1>todos</h1>
      <Form addTask={addTask}/>
      <div className="filter-buttons-container">
        { filterList }
      </div>
      <h2 id="list-heading">
        { headingText }
      </h2>
      <ul className="todo-list">
        { taskList }
      </ul>
    </div>
  );
}

export default App;
