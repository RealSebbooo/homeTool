import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdbA-qL2_NRfu3OpHy_D1WTST_sNoMzE4",
  authDomain: "hometoolproject.firebaseapp.com",
  projectId: "hometoolproject",
  storageBucket: "hometoolproject.appspot.com",
  messagingSenderId: "473756082091",
  appId: "1:473756082091:web:4b608523ae3848d1733cee",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default getFirestore(firebaseApp);
