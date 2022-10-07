import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IFolder } from "../../models/IFolder";
import { ITask } from "../../models/ITask";

interface TaskState {
  tasks: ITask[];
  idCurrentFolder: string;
}

const initialState: TaskState = {
  tasks: [],
  idCurrentFolder: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTasks(state) {
      const idCurrentFolder: string | null = localStorage.getItem("idCurrentFolder");
      if (idCurrentFolder) {
        const folder: IFolder = JSON.parse(localStorage.getItem(idCurrentFolder) || "{}");
        const idTasks: string[] = folder.tasksId;
        const tasks: ITask[] = idTasks.map((id) => JSON.parse(localStorage.getItem(id) || "{}"));
        state.tasks = tasks;
        state.idCurrentFolder = idCurrentFolder;
      } else {
        const idFolders: string[] = JSON.parse(localStorage.getItem("idFolders") || "[]");
        if (idFolders.length > 0) {
          localStorage.setItem("idCurrentFolder", idFolders[0]);
          state.idCurrentFolder = idFolders[0];
        } else {
          const folder = { id: nanoid(), name: "Личные", tasksId: [] };
          localStorage.setItem(folder.id, JSON.stringify(folder));
          localStorage.setItem("idFolders", JSON.stringify([folder.id]));
          localStorage.setItem("idCurrentFolder", folder.id);
          state.idCurrentFolder = folder.id;
        }
      }
    },

    changeFolder(state, action: PayloadAction<string>) {
      const folder: IFolder = JSON.parse(localStorage.getItem(action.payload) || "{}");
      const idTasks: string[] = folder.tasksId;
      const tasks: ITask[] = idTasks.map((id) => JSON.parse(localStorage.getItem(id) || "{}"));
      localStorage.setItem("idCurrentFolder", folder.id);
      state.tasks = tasks;
      state.idCurrentFolder = action.payload;
    },

    addTask(state, action: PayloadAction<ITask>) {
      const folder: IFolder = JSON.parse(localStorage.getItem(state.idCurrentFolder) || "{}");
      const idTasks: string[] = folder.tasksId;
      idTasks.push(action.payload.id);
      localStorage.setItem(state.idCurrentFolder, JSON.stringify(folder));
      localStorage.setItem(action.payload.id, JSON.stringify(action.payload));
      state.tasks.push(action.payload);
    },

    removeTask(state, action: PayloadAction<string>) {
      const folder: IFolder = JSON.parse(localStorage.getItem(state.idCurrentFolder) || "{}");
      const idTasks: string[] = folder.tasksId;
      idTasks.splice(idTasks.indexOf(action.payload), 1);
      localStorage.setItem(state.idCurrentFolder, JSON.stringify(folder));
      localStorage.removeItem(action.payload);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export default taskSlice.reducer;
