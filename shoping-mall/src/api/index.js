// 所有api接口进行统一管理
import requests from "./request";
import mockRequests from './mockAjax';

// 三级联动接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList   get请求 无参数
export const reqCategoryList = () => {
    // axios返回Promise
    return requests({url:'/product/getBaseCategoryList', method: 'get'});
}

// 获取首页轮播图
export const reqBannerList = () => {
    return mockRequests.get('/banner') // 上下两种写法
}