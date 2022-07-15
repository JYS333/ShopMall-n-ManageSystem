// home自己的小仓库

import { reqCategoryList } from "@/api";

const state = {
    // state初始值不能瞎写，格式要对应好
    categoryList: [],
};
const mutations = {
    CATEGORYLIST( state, categoryList){
        state.categoryList = categoryList;
    }
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，获取数据
    async categoryList({commit}){ // 这里要引用一下commit
       let res = await reqCategoryList();
       if(res.code === 200){
            commit("CATEGORYLIST",res.data);
       }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}