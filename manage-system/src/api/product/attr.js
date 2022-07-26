// 平台属性管理
import request from '@/utils/request'

// 获取一级分类数据
export const reqCategory1List = () => {
    return request({url:'/admin/product/getCategory1', method: 'get'});
}
// 获取二级分类数据，需要提供1级分类id
export const reqCategory2List = (category1Id) => {
    return request({url:`/admin/product/getCategory2/${category1Id}`, method:'get'})
}
// 获取三级分类数据，需要提供2级分类id
export const reqCategory3List = (category2Id) => {
    return request({url:`/admin/product/getCategory3/${category2Id}`, method:'get'})
}
// 通过三级分类获取列表数据
export const reqCertainCategory = () => {
    return request({url:'', method:'get'})
}
