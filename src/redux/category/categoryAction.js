import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { setCategoryList } from "./categorySlice";
import { setModalShow } from "../modal-state/modalSlice";
import { TBL_CATEGORY } from "../../utils/const";

export const addCategoryAction =
  ({ slug, ...rest }) =>
  async (dispatch) => {
    try {
      const catPromise = setDoc(doc(db, TBL_CATEGORY, slug), rest, {
        merge: true,
      });
      toast.promise(catPromise, {
        pending: "Please wait...",
        error: "Error occurred",
        success: "Successfully added ",
      });
      dispatch(fetchCategoriesAction());
      dispatch(setModalShow(false));
    } catch (e) {
      console.log("error", e); // Corrected typo here
      toast.error("Error", e.message);
    }
  };
export const fetchCategoriesAction = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "Categories"));
    console.log(querySnapshot);
    const catList = [];
    querySnapshot.forEach((doc) => {
      const slug = doc.id;
      const data = doc.data();
      catList.push({ ...data, slug });
    });
    dispatch(setCategoryList(catList));
  } catch (e) {
    toast.error(e.message);
  }
};
export const deleteCategoryAction = (slug) => async (dispatch) => {
  try {
    const deletePromise = deleteDoc(doc(db, TBL_CATEGORY, slug));
    toast.promise(deletePromise, {
      pending: "Please wait...",
      error: "Error occurred",
      success: "Successfully Deleted ",
    });
    await deletePromise;
    dispatch(fetchCategoriesAction());
  } catch (error) {}
};
