import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnaOseSfL2_tKVyYH8VB8QN3mdqhHCAfg",
    authDomain: "image-repo-a4a78.firebaseapp.com",
    databaseURL: "https://image-repo-a4a78.firebaseio.com",
    projectId: "image-repo-a4a78",
    storageBucket: "image-repo-a4a78.appspot.com",
    messagingSenderId: "567362405434",
    appId: "1:567362405434:web:4c3d1d34a665b933b96103"
};

const app: firebase.app.App = firebase.initializeApp(firebaseConfig);
const fbAuth = app.auth();
const fbFirestore = app.firestore();

if(process.env.NODE_ENV === "development") {
    fbFirestore.useEmulator("localhost", 8080);
}



export {fbAuth, fbFirestore};
