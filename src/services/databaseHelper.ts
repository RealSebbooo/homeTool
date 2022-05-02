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

import {
  ArticelType,
  RecipesType,
  ShoppingListType,
  UserType,
  WeekplanType,
} from "./../types";

export const getUserFromDatabase = async (email: string) => {
  const ref = collection(db, "users");
  const snapshot = await getDocs(ref);
  const itemDoc = snapshot.docs.find((doc) => doc.data().email == email);
  const item = { ...itemDoc.data(), uid: itemDoc.id };
  return item;

  // const item = snapshot.docs.map(doc => {...doc.data(), uid: doc.id})
};

export const userAddedToAuth = async (email: string) => {
  setItem("users", {
    email: email,
    name: email,
    shoppingList: "",
    weekplan: "",
    recipe: "",
  });

  const user = await getUserFromDatabase(email);
  const uid = user?.uid;
  setItem("shoppingLists", {
    owner: uid,
    members: [uid],
    activeArticles: [],
    recentArticles: [],
    name: user?.name + "s Einkaufsliste",
    listType: "shoppingList",
  });

  setItem("weekplans", {
    owner: uid,
    members: [uid],
    days: [],
    name: user?.name + "s Wochenplan",
    listType: "weekplan",
  });
  setItem("recipes", {
    owner: uid,
    members: [uid],
    recipes: [],
    name: user?.name + "s Rezepte",
    listType: "recipe",
  });
};

const setItem = async (collectionName: string, data: object) => {
  const citiesRef = collection(db, collectionName);
  const docRef = await addDoc(citiesRef, data);
  addUidToNewList(collectionName, { ...data, uid: docRef.id }, docRef.id);
};

const addUidToNewList = (collectionName: string, data: object, uid: string) => {
  setDoc(doc(db, collectionName, uid), data);
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

export const saveArticleInDatabase = (item: ArticelType) => {
  setDoc(doc(db, "articles", item.uid), item);
};

export const getAllShoppingList = async (): Promise<ShoppingListType[]> => {
  if (typeof window == "undefined") return;
  const userId = JSON.parse(localStorage.getItem("htUser"))?.uid;

  const ref = collection(db, "shoppingLists");
  const q = query(ref, where("members", "array-contains", userId));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  return itemsDoc;
};

export const getShoppingList = async (
  listId: string
): Promise<ShoppingListType> => {
  const ref = collection(db, "shoppingLists");
  const q = query(ref, where("uid", "==", listId));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  return itemsDoc[0];
};
export const getWeekplans = async (): Promise<WeekplanType[]> => {
  if (typeof window == "undefined") return;
  const userId = JSON.parse(localStorage.getItem("htUser"))?.uid;

  const ref = collection(db, "weekplans");
  const q = query(ref, where("members", "array-contains", userId));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  return itemsDoc;
};
export const getRecipes = async (): Promise<RecipesType[]> => {
  if (typeof window == "undefined") return;
  const userId = JSON.parse(localStorage.getItem("htUser"))?.uid;

  const ref = collection(db, "recipes");
  const q = query(ref, where("members", "array-contains", userId));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  return itemsDoc;
};

export const updateShoppingList = (item: ShoppingListType) => {
  setDoc(doc(db, "shoppingLists", item.uid), item);
};
export const updateRecipe = (item: RecipesType) => {
  setDoc(doc(db, "recipes", item.uid), item);
};
export const updateWeekplan = (item: WeekplanType) => {
  setDoc(doc(db, "weekplans", item.uid), item);
};

export const updateUser = async (item: UserType) => {
  await setDoc(doc(db, "users", item.uid), item);

  const newUser = await getUserFromDatabase(item?.email);
  if (newUser) {
    if (typeof window !== "undefined") {
      localStorage.setItem("htUser", JSON.stringify(newUser));

      if (typeof window == "undefined") return;
      location.reload();
    }
  }
};

export const getUserByEmailAdress = async (email: string) => {
  const ref = collection(db, "users");
  const q = query(ref, where("email", "==", email));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    var rObj = { ...doc.data(), uid: doc.id };
    return rObj;
  });
  return itemsDoc[0];
};

export const getUserByUid = async (uid: string) => {
  const ref = collection(db, "users");
  const q = query(ref, where("uid", "==", uid));
  const snapshot = await getDocs(q);
  const itemsDoc = snapshot.docs.map((doc) => {
    if (doc.data()) {
      var rObj = { ...doc.data(), uid: doc.id };
      return rObj;
    }
  });
  return itemsDoc[0];
};

export const deleteShoppingList = (uid: string) => {
  deleteDoc(doc(db, "shoppingLists", uid));
};
export const deleteRecipe = (uid: string) => {
  deleteDoc(doc(db, "recipes", uid));
};
export const deleteWeekplan = (uid: string) => {
  deleteDoc(doc(db, "weekplans", uid));
};

export const createNewShoppingList = (name: string) => {
  if (typeof window == "undefined") return;
  const user = JSON.parse(localStorage.getItem("htUser"));
  setItem("shoppingLists", {
    owner: user?.uid,
    members: [user?.uid],
    activeArticles: [],
    recentArticles: [],
    name: name,
    listType: "shoppingList",
  });
};
export const createNewWeekplanList = (name: string) => {
  if (typeof window == "undefined") return;
  const user = JSON.parse(localStorage.getItem("htUser"));

  setItem("weekplans", {
    owner: user?.uid,
    members: [user?.uid],
    days: [],
    name: name,
    listType: "weekplan",
  });
};
export const createNewRecipeList = (name: string) => {
  if (typeof window == "undefined") return;
  const user = JSON.parse(localStorage.getItem("htUser"));
  setItem("recipes", {
    owner: user?.uid,
    members: [user?.uid],
    recipes: [],
    name: name,
    listType: "recipe",
  });
};
