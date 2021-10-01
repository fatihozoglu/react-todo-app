import React from "react";
import { useState } from "react";

export default function Form( props ) {
    const [name, setName] = useState("");

    //If the task name is not empty we are sending the name to App component with addTask callback prop
    function handleSubmit(e) {
        e.preventDefault();
        if(name !== "") {
            props.addTask(name);
            setName("");
        } else alert("Please enter a task");
    }

    //Changing the state of name with the information coming from input
    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form className="task-input-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <input
                    type="text"
                    id="new-todo"
                    className="task-input"
                    name="text"
                    autoComplete="off"
                    value={ name }
                    onChange={handleChange}
                    placeholder="Enter a task"
                />
                <button type="submit" className="task-submit">
                Add
                </button>
            </div>
            
        </form>
    )
}