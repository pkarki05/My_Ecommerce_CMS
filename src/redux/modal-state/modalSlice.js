import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modalShow: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    setModalShow: (state, action) => {
      state.modalShow = action.payload;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { setModalShow } = actions;
export default reducer;
