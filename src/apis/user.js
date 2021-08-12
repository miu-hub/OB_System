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
export const user_info = (token) => {

    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile',
        // 使用headers来设置请求头信息
        // Authorization来设置用户令牌
        // 只有令牌正确才能获取接口中的信息
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// 编辑用户信息的接口
export const edit_user = (token, data) => {
    return request({
        method: 'PATCH',
        url: "/mp/v1_0/user/profile",

        headers: {
            Authorization: `Bearer ${token}`
        },
        data,
    })
}

// 编辑用户头像
export const edit_userPhoto = (token, data) => {
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/photo',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data,
    })
}

// 刷新用户token接口
export const updata_token = (token) => {
    return request({
        method: 'PUT',
        url: '/mp/v1_0/authorizations',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}