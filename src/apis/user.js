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
    })
}


// 用户信息接口
export const user_info = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        // 使用headers来设置请求头信息
        // Authorization来设置用户令牌
        // 只有令牌正确才能获取接口中的信息
        headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTk0OTUxNDAsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.08DZS1Po5Hg6Kn4bIw5MI_kJLo3A2Wa98qNE1xmXlJ8'
        }
    })
}
