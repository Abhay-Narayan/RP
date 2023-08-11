import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
 
const firebaseConfig = {
  apiKey: "AIzaSyBTa1FdEu3ezbLzCT0irrg82wpcPlwkMp0",
  authDomain: "moviez-13d9c.firebaseapp.com",
  projectId: "moviez-13d9c",
  storageBucket: "moviez-13d9c.appspot.com",
  messagingSenderId: "442363577842",
  appId: "1:442363577842:web:62174937d8994b6f6e576b"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();
const auth=firebase.auth();

export {auth}
export default db;