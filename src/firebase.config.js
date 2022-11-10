import {getApp,getApps,initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC48aVTC_Dag9dqZzoQ8C8FrLREMIs6Py0",
    authDomain: "iiitsfoodies.firebaseapp.com",
    databaseURL: "https://iiitsfoodies-default-rtdb.firebaseio.com",
    projectId: "iiitsfoodies",
    storageBucket: "iiitsfoodies.appspot.com",
    messagingSenderId: "20825608962",
    appId: "1:20825608962:web:4b9da520a237cb2d70281b"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
 export {app,firestore,storage};