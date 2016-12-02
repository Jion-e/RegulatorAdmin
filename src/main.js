import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import routes from './routes'
import filters from './filters'

import './assets/css/reset.less'
import './assets/css/style.less'
import './assets/css/FontAwesome/font-awesome.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

//过滤器注册
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  routes
})

new Vue({ // eslint-disable-line
  // el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
