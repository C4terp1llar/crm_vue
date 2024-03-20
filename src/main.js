import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCgf0ZvUnYyAsrkkgnbQxLec-IIrTf3p0s",
    authDomain: "crm--vue-3.firebaseapp.com",
    projectId: "crm--vue-3",
    storageBucket: "crm--vue-3.appspot.com",
    messagingSenderId: "545386863832",
    appId: "1:545386863832:web:99f9490c25fd9d7b844bad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

createApp(App).use(store).use(router).mount('#app')
