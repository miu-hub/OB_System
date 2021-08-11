/****
 * 
 * 用户素材管理
 */


import axios from '../utils/request';

// 发布用户图片
export const user_img = (token, data) => {
    return axios({
        method: 'POST',
        url: '/mp/v1_0/user/images',
        headers: {
            // 根据接口文档此处应该设置请求类型
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
        data,
    })
}


//上传用户图片素材
export const img_matter = (token, data) => {
    return axios({
        method: 'POST',
        url: '/mp/v1_0/user/images',

        headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
        data,
    })
}


// 收藏用户图片
export const star_matter = (token, target, data) => {
    return axios({
        method: 'PUT',
        url: `/mp/v1_0/user/images/${target}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data,
    })
}

// 删除用户图片素材
export const del_matter = (token, target) => {
    return axios({
        method: 'DELETE',
        url: `/mp/v1_0/user/images/${target}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}

// 获取用户图片
export const get_matter = (token, params) => {
    return axios({
        method: 'GET',
        url: '/mp/v1_0/user/images',
        headers: {
            Authorization: `Bearer ${token}`
        },
        params,
    })
}