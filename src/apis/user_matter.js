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