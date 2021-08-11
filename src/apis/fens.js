/**
 * 粉丝请求相关
 * 
 */

import axios from '../utils/request';

// 获取用户粉丝数据
export const fens_data = (token, params) => {
    return axios({
        method: 'GET',
        url: '/mp/v1_0/followers',
        headers: {
            Authorization: `Bearer ${token}`
        },
        params,
    })
}