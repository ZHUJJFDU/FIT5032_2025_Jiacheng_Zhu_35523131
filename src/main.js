// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura } })

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')

// Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDNarYX2diEFv_1M-uv7IOdPvl1m_CZdkA",
  authDomain: "fit5032-lab7-78c0a.firebaseapp.com",
  projectId: "fit5032-lab7-78c0a",
  storageBucket: "fit5032-lab7-78c0a.firebasestorage.app",
  messagingSenderId: "8972728571",
  appId: "1:8972728571:web:86c1ebb8b174034acd585e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);