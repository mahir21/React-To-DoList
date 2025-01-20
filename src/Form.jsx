//Key thing to note. The ... is a shallow operator. Meaning it will copy the values from the exsisting array
import { React, useState, useEffect } from "react";

const Form = () => {
  const [addTask, setAddTask] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTask = localStorage.getItem("tasks");
    if (savedTask) {
      setAddTask(JSON.parse(savedTask));
    }
  }, []);

  // Save tasks to localStorage whenever the addTask state changes
  useEffect(() => {
    if (addTask.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(addTask));
      console.log("Tasks saved to localStorage:", addTask);
    }
  }, [addTask]);

  const addTaskFunction = () => {
    if (newTask.trim() !== "") {
      if (editIndex === null) {
        setAddTask([...addTask, { taskName: newTask, isCompleted: false }]);
        setNewTask("");
      } else {
        const updateTask = [...addTask];
        updateTask[editIndex] = newTask;
        setAddTask(updateTask);
        setEditIndex(null);
      }

      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setAddTask(addTask.filter((task, taskIndex) => taskIndex !== index));
  };

  const editTask = (index) => {
    setNewTask(addTask[index]);
    setEditIndex(index);
  };

  //This is checkBox Functionality

  const checkBox = (index) => {};

  return (
    <div className="flex flex-col gap-4 items-center min-h-screen p-4">
      <input
        className="p-2 border-2 border-blue-500 w-20 sm:w-24 md:w-60 text-sm sm:text-md md:text-lg"
        type="text"
        value={newTask}
        placeholder="Enter Task"
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button
        className="bg-blue-500  w-20 sm:w-24 md:w-28  p-2  rounded"
        onClick={addTaskFunction}
      >
        Add{" "}
      </button>
      <ul>
        {addTask.map((task, index) => (
          <li key={index}>
            <div className="p-1 sm:p-2 md:p-4  text-sm sm:text-md md:text-lg border-1 border-gray-100 shadow-lg">
              {task.taskName}
            </div>

            <div>
              <button
                className="bg-red-500 p-2 m-2 rounded"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 p-2 m-2 w-16 sm:w-24 md:w-28 rounded"
                onClick={() => editTask(index)}
              >
                Edit
              </button>

              <input
                className="p-2 w-16 sm:w-24 md:w-28 bg-red-500"
                type="checkbox"
                onClick={() => checkBox(index)}
              ></input>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
