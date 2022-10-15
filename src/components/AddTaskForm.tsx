import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ITask } from "../models/ITask";
import { taskSlice } from "../store/reducers/TaskSlice";
import PlusIcon from "../ui/icons/PlusIcon";
import { Button, Modal, Input } from "antd";

const AddTaskForm = () => {
  const { idCurrentFolder } = useAppSelector((state) => state.taskReducer);
  const { addTask } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const [nameTask, setNameTask] = useState("");
  const [descriptionTask, setDescriptionTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(false);

  const handleAddTask = (nameTask: string, descriptionTask: string) => {
    return () => {
      if (!nameTask || !descriptionTask) {
        setStatus(true);
      } else {
        const task: ITask = {
          id: nanoid(),
          header: nameTask,
          description: descriptionTask,
          idCurrentFolder,
          isDone: false,
        };
        setNameTask("");
        setDescriptionTask("");
        setIsModalOpen(false);
        setStatus(false);
        dispatch(addTask(task));
      }
    };
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setNameTask("");
    setDescriptionTask("");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-md mx-auto flex items-center">
      <Button type="primary" shape="round" size="large" onClick={showModal}>
        <div className="flex justify-between items-center">
          <PlusIcon className="w-6 h-6 mr-1 pt-1" />
          Добавить задачу!
        </div>
      </Button>
      <Modal
        title="Добавление новой задачи"
        open={isModalOpen}
        onOk={handleAddTask(nameTask, descriptionTask)}
        onCancel={handleCancel}
      >
        Заголовок задачи:
        <Input
          status={status ? "error" : ""}
          placeholder="name task..."
          value={nameTask}
          onChange={(e) => setNameTask(e.target.value)}
        />
        <p />
        Описание задачи:
        <Input
          status={status ? "error" : ""}
          placeholder="description..."
          value={descriptionTask}
          onChange={(e) => setDescriptionTask(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AddTaskForm;
