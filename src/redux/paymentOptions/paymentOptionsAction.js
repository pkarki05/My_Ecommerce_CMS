import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { setPaymentOptList } from "./paymentOptionsSlice";
import { setModalShow } from "../modal-state/modalSlice";
import { TBL_PAYMENT } from "../../utils/const";

export const addPaymentOptions =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const paymentOptionPromise = setDoc(doc(db, TBL_PAYMENT, slug), rest, {
        merge: true,
      });
      toast.promise(paymentOptionPromise, {
        pending: "Please wait...",
        error: "Error occurred",
        success: "Successfully added ",
      });
      dispatch(fetchPaymentOptionsAction());
      dispatch(setModalShow(false));
    } catch (e) {
      console.log("error", e); // Corrected typo here
      toast.error("Error", e.message);
    }
  };
export const fetchPaymentOptionsAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, TBL_PAYMENT));
    console.log(querySnapshot);
    const paymentOptionsList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      paymentOptionsList.push({ ...data, slug });
    });
    dispatch(setPaymentOptList(paymentOptionsList));
  } catch (e) {
    toast.error(e.message);
  }
};
export const deletePaymentOptionAction = (slug) => async (dispatch) => {
  try {
    const deletePromise = deleteDoc(doc(db, TBL_PAYMENT, slug));
    toast.promise(deletePromise, {
      pending: "Please wait...",
      error: "Error occurred",
      success: "Successfully Deleted ",
    });
    await deletePromise;
    dispatch(fetchPaymentOptionsAction());
  } catch (error) {}
};
