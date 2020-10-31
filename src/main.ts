import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/js/common.js';
import './assets/css/border.css';
import './assets/css/resets.css';
import './assets/css/iconfont.css';

createApp(App).use(store).use(router).mount('#app')
