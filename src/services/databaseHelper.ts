import db from "./firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { ArticelType } from "./../types";

export const getShoppinglistItems = async () => {
  const ref = collection(db, "shoppingsLists");
  const snapshot = await getDocs(ref);
  const items = snapshot.docs.map((doc) => doc.data());

  console.log("ites", items);
};
export const getUserFromDatabase = async (email: string) => {
  const ref = collection(db, "users");
  const snapshot = await getDocs(ref);
  console.log("hier");
  const itemDoc = snapshot.docs.find((doc) => doc.data().email == email);
  const item = { ...itemDoc.data(), uid: itemDoc.id };
  console.log("item", item);
  return item;

  // const item = snapshot.docs.map(doc => {...doc.data(), uid: doc.id})
};

export const userAddedToAuth = async (email: string) => {
  setItem("users", { email: email, name: email });

  const user = await getUserFromDatabase(email);
  console.log("user", user);
  const uid = user?.uid;
  setItem("shoppingLists", {
    owner: uid,
    members: [uid],
    activeArticles: [],
    recentArticles: [],
  });

  setItem("weekplans", {
    owner: uid,
    members: [uid],
    days: [],
  });
};

const setItem = (collectionName: string, data: object) => {
  const citiesRef = collection(db, collectionName);
  setDoc(doc(citiesRef), data);
};

export const getArticles = async () => {
  const ref = collection(db, "articles");
  const snapshot = await getDocs(ref);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  return itemsDoc;
};

export const saveNewArticleToDatabase = (item: ArticelType) => {
  addDoc(collection(db, "articles"), item);
};

export const deleteArticle = (uid: string) => {
  deleteDoc(doc(db, "articles", uid));
};
