// /**
//  * 项目的请求模块-------基于axios请求
//  */
import axios from 'axios'

// // 创建一个axios实例
// // 我们通过这个实例来发送请求，需要的配置配置给这个实例
// // baseURL: '',请求的基本路径
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net'
});

// 请求拦截器
// axios提供了拦截器功能即interceptors.request.use
request.interceptors.request.use(

    // 成功的请求会经过这个方法
    function (config) {
        // config可以获取到请求的详细返回体
        console.log(config.headers.Authorization);
        // 利用请求拦截器可以将所用请求添加上用户令牌
        // return可以控制请求是否被拦截------没有return则会终止请求
        return config;
    },
    // 失败的请求会经过这个方法
    (err) => {
        return err;
    });

export default request;