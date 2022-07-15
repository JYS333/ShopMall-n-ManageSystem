// VueX
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import home from './home';
import search from './search';

// 对外暴露store类的一个实例
const store = new Vuex.Store({
    // 储存数据的地方
    // state: {},
    // 修改state的手段
    // mutations:{},
    // 处理action
    // actions:{
        // 不能直接修改state，可以改逻辑
    // },
    // 理解为计算属性
    // getters:{},
    modules:{
        // store模块式开发，将每个都单独存
        home,
        search
    }
})
export default store;