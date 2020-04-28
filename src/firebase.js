import firebase from 'firebase/app'
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAQvM7s0oSwsITm9vlEVDHh6iy8LFYBSq8",
  authDomain: "chirptronome.firebaseapp.com",
  databaseURL: "https://chirptronome.firebaseio.com",
  projectId: "chirptronome",
  storageBucket: "chirptronome.appspot.com",
  messagingSenderId: "453587769966",
  appId: "1:453587769966:web:96f859d9f1bd66f43be47f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase