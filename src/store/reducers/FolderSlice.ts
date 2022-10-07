import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IFolder } from "../../models/IFolder";

interface FolderState {
  folders: IFolder[];
}

const initialState: FolderState = {
  folders: [{ id: nanoid(), name: "Личные", tasksId: [] }],
};

export const FolderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    fetchFolders(state) {
      const idFolders: string[] = JSON.parse(localStorage.getItem("idFolders") || "[]");
      if (idFolders.length > 0) {
        const folders = idFolders.map((id) => JSON.parse(localStorage.getItem(id) || "{}"));
        state.folders = folders;
      } else {
        localStorage.setItem(state.folders[0].id, JSON.stringify(state.folders[0]));
        localStorage.setItem("idFolders", JSON.stringify([state.folders[0].id]));
      }
    },

    addNewFolder(state, action: PayloadAction<IFolder>) {
      const idFolders: string[] = JSON.parse(localStorage.getItem("idFolders") || "[]");
      idFolders.push(action.payload.id);
      localStorage.setItem("idFolders", JSON.stringify(idFolders));
      localStorage.setItem(action.payload.id, JSON.stringify(action.payload));
      state.folders.push(action.payload);
    },

    removeFolder(state, action: PayloadAction<string>) {
      const idFolders: string[] = JSON.parse(localStorage.getItem("idFolders") || "[]");
      idFolders.splice(idFolders.indexOf(action.payload), 1);
      localStorage.setItem("idFolders", JSON.stringify(idFolders));
      const folder: IFolder = JSON.parse(localStorage.getItem(action.payload) || "{}");
      folder.tasksId.forEach((id) => localStorage.removeItem(id));
      localStorage.removeItem(action.payload);
      state.folders = state.folders.filter((folder) => folder.id !== action.payload);
    },
  },
});

export default FolderSlice.reducer;
