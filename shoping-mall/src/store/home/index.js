// home自己的小仓库

import { reqBannerList, reqCategoryList } from "@/api";

const state = {
    // state初始值不能瞎写，格式要对应好
    categoryList: [],
    bannerList: [],
};
const mutations = {
    CATEGORYLIST( state, categoryList){
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    }
};
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，获取数据
    async categoryList({commit}){ // 这里要引用一下commit
       let res = await reqCategoryList();
       if(res.code == 200){
            commit("CATEGORYLIST",res.data);
       }
    },
    async getBannerList({commit}){ // 获取首页轮播图
        let res = await reqBannerList();
        if(res.conde == 200){
            commit("BANNERLIST", res.data);
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