import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
import store from "@/store";

// 引入三级联动组件，为全局组件
import TypeNav from '@/components/TypeNav';

// 第一个参数为组件名称，第二个参数为组件
Vue.component(TypeNav.name, TypeNav);

// Vue.config.productionTip = false

export default new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库，组件实例身上会多一个$store的属性
  store,
}).$mount('#app')
