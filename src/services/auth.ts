import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserObjectType } from "../types";
import { auth } from "./firebase";
import { getUserFromDatabase, userAddedToAuth } from "./databaseHelper";
import { navigate } from "gatsby";

export const login = (user: UserObjectType) => {
  console.log("login", user);
  signInWithEmailAndPassword(auth, user?.email, user?.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const newUser = await getUserFromDatabase(user?.email);
      if (newUser) {
        localStorage.setItem("htUser", JSON.stringify(newUser));
        navigate("/");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const logout = () => {
  signOut(auth).then(() => {
    localStorage.removeItem("htUser");
    navigate("/login");
  });
};

export const register = (user: UserObjectType) => {
  createUserWithEmailAndPassword(auth, user?.email, user?.password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in", user);
      userAddedToAuth(user?.email);

      const newUser = await getUserFromDatabase(user?.email);
      if (newUser) {
        localStorage.setItem("htUser", JSON.stringify(newUser));
        navigate("/");
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const isLoggedIn = async () => {
  let loggedIn = false;
  await onAuthStateChanged(auth, (user) => {
    const lsUser = localStorage.getItem("htUser");
    console.log("lsUser", lsUser !== null || user !== null);
    if (lsUser !== null || user !== null) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
  });
  console.log("loggedIn", loggedIn);
  return loggedIn;
};
