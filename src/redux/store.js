import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import reducer from "./auth/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import categoryReducer from "../redux/category/categorySlice";
import modalReducer from "../redux/modal-state/modalSlice";
import productReducer from "../redux/product/productSlice";
import paymentOptionReducer from "../redux/paymentOptions/paymentOptionsSlice";

const reducers = combineReducers({
  userInfo: userReducer,
  category: categoryReducer,
  paymentOptions:paymentOptionReducer,
  product: productReducer,
  modal: modalReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
});
