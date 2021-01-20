import firebase from 'firebase'
import firestore from 'firebase/firestore'

const Config = {
    apiKey: "AIzaSyD2SQ2Xu9wzveNLqPcRnsXlV6wBA-Bd96Q",
    authDomain: "company-2e317.firebaseapp.com",
    databaseURL: "https://company-2e317.firebaseio.com",
    projectId: "company-2e317",
    storageBucket: "company-2e317.appspot.com",
    messagingSenderId: "1007886942919",
    appId: "1:1007886942919:web:6faeaa36669293fe4834e2",
    measurementId: "G-K1WJWBBLSY"
  };
  const firebaseapp=firebase.initializeApp(Config);

  //firebaseapp.firestore().settings({timestampsInSnapshots:true});
  export default firebaseapp.firestore();