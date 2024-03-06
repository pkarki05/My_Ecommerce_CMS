import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  paymentOptList: [],
  selectedPaymentOpt: {},
};
const paymentOptSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {
    setPaymentOptList: (state, action) => {
      state.paymentOptList = action.payload;
    },
    setSelectedPaymentOpt: (state, action) => {
      state.selectedPaymentOpt = action.payload;
    },
  },
});

const { actions, reducer } = paymentOptSlice;
export const { setPaymentOptList, setSelectedPaymentOpt } = actions;
export default reducer;
