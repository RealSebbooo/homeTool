import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const getShoppinglistItems = async () => {
  const docRef = db.collection("shoppingsLists");
  const items = await getDoc(docRef);
  console.log("ites", items);
};
