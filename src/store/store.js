// 导入Vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex);

// actions模块------接收数据---可以
// 异步处理
const actions = {

}

// 处理数据
const mutations = {
    // 绑定在$store上的方法
    // state是state中的数据------value时调用时传入的数据
    user_token(state, value) {
        state.token = value.token;
    }
}

// vuex中存储的数据
const state = {
    token: ''
}

// 类似于计算属性
const getters = {

}

// 创建并暴露一个vuex
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})