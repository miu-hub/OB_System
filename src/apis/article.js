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


}