import db from "./firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { UserType } from "./../types";
export const getShoppinglistItems = async () => {
  const citiesCol = collection(db, "shoppingsLists");
  const citySnapshot = await getDocs(citiesCol);
  const items = citySnapshot.docs.map((doc) => doc.data());

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
