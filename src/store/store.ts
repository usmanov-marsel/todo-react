import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/TaskSlice";
import FolderReducer from "./reducers/FolderSlice";

const rootReducer = combineReducers({
  taskReducer,
  FolderReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
