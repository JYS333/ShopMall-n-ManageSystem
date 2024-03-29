import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import CategorySelect from '@/components/CategorySelect';
import HintButton from '@/components/HintButton';

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.component(CategorySelect.name, CategorySelect) // 将三级联动选择组件设为全局组件，第一个参数为name，第二个为组件
Vue.component(HintButton.name, HintButton) // 将带提示的按钮组件设为全局组件，第一个参数为name，第二个为组件

Vue.config.productionTip = false

// 引入api并挂到全局vue原型上
import API from '@/api'
// 组件实例的原型的原型指向Vue.prototype，可以让组件在任何地方使用
Vue.prototype.$API = API

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
