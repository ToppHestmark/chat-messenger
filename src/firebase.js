import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC3Wj5EaciOuyb6IVjQRQ-bg0go9vG3Lns",
  authDomain: "facebook-messenger-49480.firebaseapp.com",
  databaseURL: "https://facebook-messenger-49480.firebaseio.com",
  projectId: "facebook-messenger-49480",
  storageBucket: "facebook-messenger-49480.appspot.com",
  messagingSenderId: "626478811696",
  appId: "1:626478811696:web:73727ceb27acdb9acdbbf5",
  measurementId: "G-2RQV7MC18W"
});

const db = firebaseApp.firestore();

export default db;