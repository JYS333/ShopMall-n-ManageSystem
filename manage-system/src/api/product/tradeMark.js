// 主要获取品牌管理的数据模块
import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => {
    return request({url:`/admin/product/baseTrademark/${page}/${limit}`, method:'get'})
}