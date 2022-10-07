import { Divider } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IFolder } from "../models/IFolder";
import { taskSlice } from "../store/reducers/TaskSlice";
import Task from "./Task";

const TaskList = () => {
  const { tasks, idCurrentFolder } = useAppSelector((state) => state.taskReducer);
  const { fetchTasks, addTask, removeTask } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const folder: IFolder = JSON.parse(localStorage.getItem(idCurrentFolder) || "{}");
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <>
      <div className="mb-2">Текущая папка: {folder.name}</div>
      <div className="h-px -mt-px bg-slate-200 dark:bg-slate-400/20"></div>
      <div className="divide-y divide-gray-200 space-y-1">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </>
  );
};

export default TaskList;
