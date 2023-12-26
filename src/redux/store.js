import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import reducer from "./auth/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import categoryReducer from "../redux/category/categorySlice";

const reducers = combineReducers({
  userInfo: userReducer,
  category: categoryReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
});
