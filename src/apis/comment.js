/***
 * 评论管理有关的apl请求
 */

import axios from '../utils/request';
// 修改文章评论状态
export const comment_status = (token, data, params) => {
    return axios({
        method: 'PUT',
        url: `/mp/v1_0/comments/status`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data,
        params,
    })
}