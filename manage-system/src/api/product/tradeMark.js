// 主要获取品牌管理的数据模块
import request from '@/utils/request'

export const reqTrademarkList = (page, limit) => {
    return request({url:`/admin/product/baseTrademark/${page}/${limit}`, method:'get'})
}
// 添加or更新品牌信息
export const reqAddOrUpdateTrademark = (trademark) => {
    if(trademark.id){ // 根据id去更新
        return request({url: '/admin/product/baseTrademark/update', method:'put', data: trademark})
    }else{ // 直接添加
        return request({url:'/admin/product/baseTrademark/save', method:'post', data: trademark})
    }
}
// 删除品牌信息
export const reqDeleteTrademark = (trademark) => {
    return request({url:`/admin/product/baseTrademark/remove/${trademark.id}`, method:'delete'})
}