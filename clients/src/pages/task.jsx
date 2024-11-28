import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Task = function () {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const taskOnChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const fetchTask = () => {
    axios
      .get("http://localhost:3000/task", { withCredentials: true })
      .then((res) => {
        setTasks(res.data.result);
      })
      .catch((err) => {
        console.error("Error fetching task:", err);
      });
  };

  const taskHandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/task", taskData, {
        withCredentials: true,
      })
      .then((res) => {
        fetchTask();
        setTaskData({ title: "", description: "" });
      })
      .catch((err) => {
        console.error("Axios Error:", err.response?.data || err.message);
        console.error("Status Code:", err.response?.status);
        toast.error("To add task, create an account")
      });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3000/task/${id}`, { withCredentials: true })
      .then((res) => {
        fetchTask();
      })
      .catch((err) => {
        console.error(
          "Error deleting task:",
          err.response?.data || err.message
        );
      });
  };

  const [checkedTasks, setCheckedTasks] = useState([]);

  const handleCheckboxChange = (taskId) => {
    setCheckedTasks((prevChecked) =>
      prevChecked.includes(taskId)
        ? prevChecked.filter((id) => id !== taskId)
        : [...prevChecked, taskId]
    );
  };

  return (
    <div className=" bg-pink-50">
      <Navbar/>
      <div className="flex flex-col gap-6 pt-8 px-6 lg:px-20  h-dvh">
        <TaskManager />
        <InputFields
          onInputChange={taskOnChange}
          onFormSubmit={taskHandleSubmit}
          task={taskData}
        />
        <TaskDatas
          task={tasks}
          deleteOnClick={deleteTask}
          checkedTasks={checkedTasks}
          handleCheckboxChange={handleCheckboxChange}
        />
        {/* <Link to="/" className="text-blue-600 underline text-end">
          HOME
        </Link> */}
      </div>
    </div>
  );
};

const TaskManager = function () {
  return (
    <div className="py-4 bg-pink-100  px-6 lg:px-20 hover:shadow-md rounded-2xl">
      <p className="text-2xl font-bold text-center">Task Manager</p>
    </div>
  );
};

const InputFields = function ({ onInputChange, onFormSubmit, task }) {
  return (
    <div className="py-6 px-6 lg:px-20  bg-pink-100 rounded-xl hover:shadow-md">
      <div>
        <form
          className="space-y-2 px-8 sm:flex gap-5 justify-center items-center"
          onSubmit={onFormSubmit}
        >
          <input
            type="text"
            placeholder="Enter task title"
            name="title"
            value={task.title}
            onChange={onInputChange}
            required
            className="px-6 py-3 rounded-md outline-none"
          />
          <textarea
            name="description"
            placeholder="Enter task description"
            value={task.description}
            onChange={onInputChange}
            required
            className="pl-6 pt-1 pr-6 sm:pr-16 rounded-xl flex items-center outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-950 text-white px-4 py-1 rounded-md"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

const TaskDatas = function ({ task, deleteOnClick ,handleCheckboxChange,checkedTasks}){
  return (
    <div className="bg-pink-100 px-6 lg:px-20 py-8 rounded-xl">
      <div className="text-end pb-8 font-semibold text-lg">
        {" "}
        List Of Tasks 🤓
      </div>
      <div>
        <ol className="space-y-6 text-sm sm:text-lg">
          {task && task.length > 0 ? (
            task.map((t) => (
              <li key={t.id} className="grid grid-cols-4 items-center gap-2">
                <span className="flex gap-2 sm:gap-5">
                  <input
                    type="checkbox"
                    checked={checkedTasks.includes(t.id)}
                    onChange={() => handleCheckboxChange(t.id)}
                    className="w-[18px]"
                  />
                  <span className={`${
                      checkedTasks.includes(t.id) ? "line-through text-gray-500" : ""
                    }`}>{t.title}</span>
                </span>
                <span className={`col-span-2 ${
                      checkedTasks.includes(t.id) ? "line-through text-gray-500" : ""
                    }`}>{t.description}</span>
                <button
                  onClick={() => {
                    deleteOnClick(t.id);
                  }}
                >
                  <span className="bg-gray-900 px-3 text-white hover:bg-gray-950 py-1 rounded-full">
                    x
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">
              No tasks available. Add a task to get started!
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Task;
