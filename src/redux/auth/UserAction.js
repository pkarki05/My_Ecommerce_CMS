import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setUser } from "./userSlice";
export const createNewAdminUser = async (userInfo) => {
  try {
    const resPending = createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password // Corrected typo here
    );

    toast.promise(resPending, {
      pending: "Please wait...",
    });
    const { user } = await resPending;
    console.log("response", user);

    //use firebase storage to save the user info in DB
    const { password, confirmPassword, ...rest } = userInfo;
    await setDoc(doc(db, "Users", user.uid), rest);
  } catch (e) {
    console.log("error", e); // Corrected typo here
    toast.error("Error", e.message);
  }
};
//check if the valid user trying to login then get user info
// from the db and set user info to store
export const loginAdminUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const authSnapPromise = signInWithEmailAndPassword(auth, email, password);
      toast.promise(authSnapPromise, {
        pending: "In progress...",
      });
      const { user } = await authSnapPromise;
      dispatch(getUserInfo(user.uid));
      toast.success('Login Successful')
    } catch (e) {
      toast.error("Login error");
    }
  };
//to create user profile from firebase database
//it grabs the user info from the DB and set it to redux store
export const getUserInfo = (uid) => async (dispatch) => {
  try {
    console.log("Uid", uid);

    const userSnap = await getDoc(doc(db, "Users", uid));
    if (userSnap.exists()) {
      const userData = userSnap.data();
      dispatch(setUser({ ...userData, uid }));
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    toast.error(e.message);
  }
};
