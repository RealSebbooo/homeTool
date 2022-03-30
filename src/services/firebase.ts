import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTKzLFSscg79Kdh2YT0iVO0dpzYhwxR5w",
  authDomain: "hometool-7c592.firebaseapp.com",
  projectId: "hometool-7c592",
  storageBucket: "hometool-7c592.appspot.com",
  messagingSenderId: "311277430470",
  appId: "1:311277430470:web:ef3645b071028f1fc419c7",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default getFirestore(firebaseApp);
