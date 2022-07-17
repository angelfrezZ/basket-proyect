import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDO0pUrcfauLaoK1aj0g6cJt9vZpUfXQtM",
  authDomain: "baskett-proyect.firebaseapp.com",
  projectId: "baskett-proyect",
  storageBucket: "baskett-proyect.appspot.com",
  messagingSenderId: "500416793165",
  appId: "1:500416793165:web:c56f9da9f71d30d93d6a04"
};

export default {
 app: initializeApp(firebaseConfig)

}