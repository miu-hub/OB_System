/***
 * 处理用户的接口
 */
import request from '../utils/request'

// 用户登录接口
export const login = (data) => {
    return request({
        // 请求方法
        method: "POST",
        url: "/mp/v1_0/authorizations",
        // 设置请求体
        data: data,

        // Headers: {
        //   "Content-Type": "application/json",
        // },
    })
}