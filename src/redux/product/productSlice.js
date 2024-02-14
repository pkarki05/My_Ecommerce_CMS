import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
  selectedProduct: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setproductList: (state, action) => {
      state.productList = action.payload;
    },
    setselectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

const { actions, reducer } = productSlice;
export const { setproductList, setselectedProduct } = actions;
export default reducer;
