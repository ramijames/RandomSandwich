import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth,connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVlhZDkAnd4CLjw1R32QG2veeTTwV0hoE",
  authDomain: "random-sandwich.firebaseapp.com",
  projectId: "random-sandwich",
  storageBucket: "random-sandwich.appspot.com",
  messagingSenderId: "952244633600",
  appId: "1:952244633600:web:7be2fe87a73185fa1f58e5",
  measurementId: "G-Q4M2VT0Z5F"
};

// Initialize Firebase
initializeApp(firebaseConfig)

// if (location.hostname === "localhost") {
//   connectAuthEmulator(getAuth(), "http://localhost:9099");
// }

const pinia = createPinia()

createApp(App)
  .use(firebaseConfig)
  .use(router)
  .use(pinia)
  .mount('#app')