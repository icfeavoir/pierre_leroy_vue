import { createApp } from 'vue'
import axios from 'axios'
import $ from 'jquery'
import Parallax from 'parallax-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'

// Expose globals used by components.
window.$ = window.jQuery = $
window.Parallax = Parallax

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.mount('#app')
