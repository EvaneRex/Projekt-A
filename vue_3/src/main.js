import { createApp } from 'vue'
import App from './App.vue'
import Login from './komponent/Login.vue'
const app = createApp(App)
app.component('Login', Login)
app.mount('#app')
