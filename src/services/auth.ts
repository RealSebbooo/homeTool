import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UserObjectType } from "../types";
import { auth } from "./firebase";
import {
  getUserFromDatabase,
  updateUser,
  userAddedToAuth,
} from "./databaseHelper";
import { navigate } from "gatsby";
// import { globalHistory } from "@reach/router";

export const login = (user: UserObjectType) => {
  signInWithEmailAndPassword(auth, user?.email, user?.password).then(
    async (userCredential) => {
      const user = userCredential.user;
      const newUser = await getUserFromDatabase(user?.email);
      if (newUser) {
        if (typeof window !== "undefined")
          localStorage.setItem("htUser", JSON.stringify(newUser));
        navigate("/");
      }
    }
  );
};

export const logout = () => {
  signOut(auth).then(() => {
    if (typeof window !== "undefined") localStorage.removeItem("htUser");
    navigate("/login");
  });
};

export const register = (user: UserObjectType) => {
  createUserWithEmailAndPassword(auth, user?.email, user?.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      userAddedToAuth(user?.email);

      const newUser = await getUserFromDatabase(user?.email);
      if (newUser) {
        updateUser(newUser);
        if (typeof window !== "undefined")
          localStorage.setItem("htUser", JSON.stringify(newUser));
        navigate("/");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const isLoggedIn = async () => {
  if (typeof window == "undefined") return;
  const lsUser = localStorage.getItem("htUser");
  // if (lsUser === null) {
  //   const path = globalHistory.location.pathname;
  //   if (path !== "/login" && path !== "/register") {
  //     navigate("/login");
  //   }
  // } else {
  //   await onAuthStateChanged(auth, (user) => {
  //     if (user === null) {
  //       const path = globalHistory.location.pathname;
  //       if (path !== "/login" && path !== "/register") {
  //         navigate("/login");
  //       }
  //     }
  //   });
  // }
};
