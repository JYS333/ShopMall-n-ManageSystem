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
export const reqCertainCategory = (data) => { // data: {category1Id:'', category2Id:'', category3Id:''}
    return request({url:`/admin/product/attrInfoList/${data.category1Id}/${data.category2Id}/${data.category3Id}`, method:'get'})
}
// 添加属性与属性值
export const reqSaveAttrInfo = (data) => {
    return request({url:'/admin/product/saveAttrInfo', method:'post', data})
}