import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    categoryList: [],
  selectedCategory: {},
};
const categorySlice = createSlice({
  name: "Category",
  initialState,

  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
      },
  },
});

const { actions, reducer } = categorySlice;
export const { setCategoryList,setSelectedCategory } = actions;
export default reducer;
