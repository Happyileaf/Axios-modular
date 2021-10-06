import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementUI)
app.mount('#app')
