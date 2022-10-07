import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { FolderSlice } from "../store/reducers/FolderSlice";
import { taskSlice } from "../store/reducers/TaskSlice";
import ArrowUpDown from "../ui/ArrowUpDown";
import "../App.css";
import { Transition } from "@headlessui/react";
import { Button, Input } from "antd";
import DeleteIcon from "../ui/icons/DeleteIcon";
import { nanoid } from "nanoid";
import { IFolder } from "../models/IFolder";

const DropDownFolders = () => {
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { idCurrentFolder } = useAppSelector((state) => state.taskReducer);
  const { fetchFolders, addNewFolder, removeFolder } = FolderSlice.actions;
  const { changeFolder } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [nameFolder, setNameFolder] = useState("");

  const handlePressInputEnter = (nameFolder: string) => {
    return () => {
      const folder: IFolder = {
        id: nanoid(),
        name: nameFolder,
        tasksId: [],
      };
      dispatch(addNewFolder(folder));
      setNameFolder("");
      setIsInputOpen(false);
    };
  };

  const handleOpenDropDown = () => {
    if (isOpen) {
      setIsInputOpen(false);
    }
    setIsOpen(!isOpen);
  };

  const handleChangeFolder = (idFolder: string) => {
    return (e: React.MouseEvent) => {
      dispatch(changeFolder(idFolder));
      e.stopPropagation();
    };
  };

  const handleDeleteFolder = (idFolder: string) => {
    return (e: React.MouseEvent) => {
      dispatch(changeFolder(folders[0].id));
      dispatch(removeFolder(idFolder));
      e.stopPropagation();
    };
  };

  useEffect(() => {
    dispatch(fetchFolders());
  }, []);

  return (
    <div className="w-72">
      <div
        className="group bg-sky-300 ring ring-gray-200 hover:text-slate-100 hover:bg-sky-500 flex items-center justify-center space-x-2 hover:cursor-pointer rounded-md"
        onClick={handleOpenDropDown}
      >
        <ArrowUpDown isOpen={isOpen} />
        <div>Folders</div>
      </div>
      <ul className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
        {folders.map((folder, index) => (
          <Transition
            key={folder.id}
            show={isOpen}
            enter={`transition-[height] duration-150`}
            enterFrom="h-0"
            enterTo="h-9"
            leave="transition-[height] duration-150"
            leaveFrom="h-9"
            leaveTo="h-0"
          >
            <li
              className={
                index === 0
                  ? "flex items-center justify-between h-9 py-1 hover:bg-sky-100 pr-6"
                  : "flex items-center justify-between h-9 py-1 hover:bg-sky-100"
              }
              onClick={handleChangeFolder(folder.id)}
            >
              <div className="flex-1">{folder.name}</div>
              {index !== 0 ? (
                <button className="mr-2" onClick={handleDeleteFolder(folder.id)}>
                  <DeleteIcon />
                </button>
              ) : null}
            </li>
          </Transition>
        ))}
      </ul>
      {isOpen ? <Button onClick={() => setIsInputOpen(true)}>Добавить папку!</Button> : null}
      {isInputOpen ? (
        <div className="flex space-between items-center">
          <Input
            placeholder="name folder..."
            value={nameFolder}
            onChange={(e) => setNameFolder(e.target.value)}
            onPressEnter={handlePressInputEnter(nameFolder)}
          />
          <button onClick={() => setIsInputOpen(false)}>
            <DeleteIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownFolders;
