import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import _util from './utils/index'
Vue.prototype.$util = _util;

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
