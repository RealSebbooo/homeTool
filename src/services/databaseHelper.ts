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

import { ArticelType, ShoppingListType, UserType } from "./../types";

export const getUserFromDatabase = async (email: string) => {
  const ref = collection(db, "users");
  const snapshot = await getDocs(ref);
  const itemDoc = snapshot.docs.find((doc) => doc.data().email == email);
  const item = { ...itemDoc.data(), uid: itemDoc.id };
  return item;

  // const item = snapshot.docs.map(doc => {...doc.data(), uid: doc.id})
};

export const userAddedToAuth = async (email: string) => {
  setItem("users", { email: email, name: email });

  const user = await getUserFromDatabase(email);
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
  console.log("getARticles");
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

export const saveArticleInDatabase = (item: ArticelType) => {
  setDoc(doc(db, "articles", item.uid), item);
};

export const getShoppingList = async (): Promise<ShoppingListType[]> => {
  console.log("getShoppingList");
  if (typeof window == "undefined") return;
  const userId = JSON.parse(localStorage.getItem("htUser"))?.uid;

  const ref = collection(db, "shoppingLists");
  const q = query(ref, where("members", "array-contains", userId));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  console.log("items", itemsDoc);
  return itemsDoc;
};

export const updateShoppingList = (item: ShoppingListType) => {
  setDoc(doc(db, "shoppingLists", item.uid), item);
};

export const updateUser = async (item: UserType) => {
  setDoc(doc(db, "users", item.uid), item);

  const newUser = await getUserFromDatabase(item?.email);
  if (newUser) {
    if (typeof window !== "undefined")
      localStorage.setItem("htUser", JSON.stringify(newUser));
  }
};
