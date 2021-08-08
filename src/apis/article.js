/***
 * 文章信息类接口
 *
 */
// 获取请求模块
import request from '../utils/request'
// 暴露获取文章信息接口
export const articles = (token, params) => {

    return request({
        // 请求方式
        method: 'GET',

        url: '/mp/v1_0/articles',

        headers: {
            // 用户令牌
            Authorization: `Bearer ${token}`
        },

        // params----get方法的配置要求------可传递给服务器
        params,
    })
};

// 获取文章频道接口
export const channel = (token) => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels',

        headers: {
            // 用户令牌
            Authorization: `Bearer ${token}`
        },
    })
}

// 删除文章模块
export const del_channel = (tar_id, token) => {
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${tar_id}`,

        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


// 发布文章
export const public_article = (token, data, isdraft) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',

        headers: {
            Authorization: `Bearer ${token}`
        },
        data,

        params: { draft: isdraft }
    })
}

// 指定搜索id来获取文章
export const id_article = (token, article_id) => {
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${article_id}`,

        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

// 编辑文章
export const edit_article = (token, article_id, data, isdraft) => {
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${article_id}`,

        headers: {
            Authorization: `Bearer ${token}`
        },
        data,
        params: { draft: isdraft }
    })
}

