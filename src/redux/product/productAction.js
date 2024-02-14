import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { TBL_PRODUCT } from "../../utils/const";
import { setproductList } from "./productSlice";

export const addProductAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const productPromise = setDoc(doc(db, TBL_PRODUCT, slug), rest, {
        merge: true,
      });
      toast.promise(productPromise, {
        pending: "Please wait...",
        error: "Error occurred",
        success: "Successfully added ",
      });
      dispatch(fetchProductAction());
    } catch (e) {
      console.log("error", e); // Corrected typo here
      toast.error("Error", e.message);
    }
  };
export const fetchProductAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, TBL_PRODUCT));
    console.log(querySnapshot);
    const productList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      productList.push({ ...data, slug });
    });
    dispatch(setproductList(productList));
  } catch (e) {
    toast.error(e.message);
  }
};
export const deleteProductAction = (slug) => async (dispatch) => {
  try {
    const deletePromise = deleteDoc(doc(db, TBL_PRODUCT, slug));
    toast.promise(deletePromise, {
      pending: "Please wait...",
      error: "Error occurred",
      success: "Successfully Deleted ",
    });
    await deletePromise;
    dispatch(fetchProductAction());
  } catch (error) {}
};
