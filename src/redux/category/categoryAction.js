import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { setCategoryList } from "./categorySlice";

export const addCategoryAction =
  ({ slug, ...rest }) =>
  async (dispach) => {
    try {
      const catPromise = setDoc(doc(db, "Categories", slug), rest, {
        merge: true,
      });
      toast.promise(catPromise, {
        pending: "Please wait...",
        error: "Error occurred",
        success: "Successfully added ",
      });
      dispach(fetchCategoriesAction());
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
