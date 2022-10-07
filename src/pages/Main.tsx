import React from "react";
import AddTaskForm from "../components/AddTaskForm";
import DropDownFolders from "../components/DropDownFolders";
import Header from "../components/Header";
import TaskList from "../components/TaskList";

const Main = () => {
  return (
    <div>
      <Header />
      <div className="flex items-start mt-3">
        <DropDownFolders />
        <div className="flex flex-1 flex-col">
          <TaskList />
          <AddTaskForm />
        </div>
      </div>
    </div>
  );
};

export default Main;
