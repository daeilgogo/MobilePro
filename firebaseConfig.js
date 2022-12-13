import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";



const firebaseConfig ={
    // Import the functions you need from the SDKs you need
    apiKey: "AIzaSyCS58L2_mVEBZKGcj5s8gdX2KG0UDWlbgg",
    authDomain: "test-a52d2.firebaseapp.com",
    databaseURL: "https://test-a52d2-default-rtdb.firebaseio.com",
    projectId: "test-a52d2",
    storageBucket: "test-a52d2.appspot.com",
    messagingSenderId: "886722210911",
    appId: "1:886722210911:web:454b464cc1dada41ceffea",
    measurementId: "G-6ZJWQWDDGV"
};

const app = initializeApp(firebaseConfig);
const db=initializeFirestore(app,{experimentalForceLongPolling:true,})
export {db}