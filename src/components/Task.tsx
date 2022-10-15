import React, { useState } from "react";
import { ITask } from "../models/ITask";
import { Radio } from "antd";
import { useAppDispatch } from "../hooks/redux";
import { taskSlice } from "../store/reducers/TaskSlice";
import DeleteIcon from "../ui/icons/DeleteIcon";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const { removeTask } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="flex ml-10 items-center hover:bg-slate-100">
        <Radio checked={checked} onClick={(e) => setChecked(!checked)} />
        <div className="flex flex-col justify-start items-start ml-2">
          <div>{task.header}</div>
          <div className="text-sm text-slate-600">{task.description}</div>
        </div>
        <div className="ml-auto w-9 h-9 mr-6 flex content-center items-center">
          <button onClick={() => dispatch(removeTask(task.id))}>
            <DeleteIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
