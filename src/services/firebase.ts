import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCTKzLFSscg79Kdh2YT0iVO0dpzYhwxR5w",
//   authDomain: "hometool-7c592.firebaseapp.com",
//   projectId: "hometool-7c592",
//   storageBucket: "hometool-7c592.appspot.com",
//   messagingSenderId: "311277430470",
//   appId: "1:311277430470:web:ef3645b071028f1fc419c7",
// };

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
