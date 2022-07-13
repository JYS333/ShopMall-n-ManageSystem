import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';

// 核心：解决代码冗余
// 问题：多次点击push的路由跳转，控制台报错redundant跳转
// 该问题存在于Vue-router v3.0之后的版本，由于新加入的同一路径跳转错误异常功能导致，所以重写两个跳转

// push
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

export default new VueRouter({
    // 配置路由 key-value对儿， path-component 路径-组件 
    routes:[
        {
            name:'home',
            path: '/home',
            component: Home,
            meta:{
                // 自定义属性只支持在meta中扩展，每个route对象的属性是固定的
                show:true, // 用来自定义控制(通过访问$route.meta.show属性)由组件的显示与隐藏
            }
        },
        {
            name:'login',
            path: '/login',
            component: Login,
            meta:{
                show:false
            }
        },
        {
            name:'register',
            path: '/register',
            component: Register,
            meta:{
                show:false
            }
        },{
            name:'search',
            path: '/search/:keyword?', // 后面加上?表示可传可不传，否则路由路径会出错
            component: Search,
            meta:{
                show:true
            }
        },
        // 重定向，从其他路径定向到首页Home
        {
            path: '*',
            redirect: '/home'
        }
    ]
})