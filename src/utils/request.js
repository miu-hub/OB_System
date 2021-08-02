// /**
//  * 项目的请求模块-------基于axios请求
//  */
import axios from 'axios'

// // 创建一个axios实例
// // 我们通过这个实例来发送请求，需要的配置配置给这个实例
// // baseURL: '',请求的基本路径
export default axios.create({
    baseURL: 'http://www.tianqiapi.com'
})