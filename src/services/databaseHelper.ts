import db from "./firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const getShoppinglistItems = async () => {
  const citiesCol = collection(db, "shoppingsLists");
  const citySnapshot = await getDocs(citiesCol);
  const items = citySnapshot.docs.map((doc) => doc.data());

  console.log("ites", items);
};

const setItem = () => {
  const citiesRef = collection(db, "shoppingLists");
  setDoc(doc(citiesRef), {
    owner: "Sebbooo",
    members: ["Sebbooo"],
    activeArticles: [
      {
        name: "Paulaner Spezi 1",
        category: "mehl",
        unit: "KG",
        icon: "asdasd",
        id: 1,
      },

      {
        name: "Paulaner Spezi 2",
        category: "mehl",
        unit: "KG",
        icon: "asdasd",
        id: 2,
      },

      {
        name: "Paulaner Spezi 3",
        category: "mehl",
        unit: "KG",
        icon: "asdasd",
        id: 3,
      },
    ],
    recentArticles: [],
  });
};
