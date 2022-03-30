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
import { globalHistory } from "@reach/router";

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
  await onAuthStateChanged(auth, (user) => {
    const lsUser = localStorage.getItem("htUser");
    if (lsUser === null || user === null) {
      const path = globalHistory.location.pathname;
      if (path !== "/login" && path !== "/register") {
        navigate("/login");
      }
    }
  });
};
