// /**
//  * 项目的请求模块-------基于axios请求
//  */
import axios from 'axios'

// 引入json—bigint
import bigInt from 'json-bigint'
// // 创建一个axios实例
// // 我们通过这个实例来发送请求，需要的配置配置给这个实例
// // baseURL: '',请求的基本路径
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',

    // axios配置----用于将响应的数据由json转换为js数据
    // 但是转换时会将某些json字符串转换后值发生改变-----传入值超出限制
    // 可以通过引入第三方库json-bigint来解决
    // 使用bigint.parse(data)将其转换为特定类型来避免出现限制
    // 转换为js时使用toString来使用数据
    transformResponse: [function (data) {

        //axios配置中可能会出现响应数据非json的情况
        try {
            // 非json会报错-----则执行catch
            return bigInt.parse(data);
        } catch (error) {
            console.log('传入的不是json' + error);
            return data
        }
    }]
});

// 请求拦截器
// axios提供了拦截器功能即interceptors.request.use
request.interceptors.request.use(

    // 成功的请求会经过这个方法
    function (config) {
        // config可以获取到请求的详细返回体
        // console.log(config.headers.Authorization);
        // 利用请求拦截器可以将所用请求添加上用户令牌
        // return可以控制请求是否被拦截------没有return则会终止请求
        return config;
    },
    // 失败的请求会经过这个方法
    (err) => {
        return err;
    });

export default request;