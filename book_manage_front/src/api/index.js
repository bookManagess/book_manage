import Vue from 'vue'
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

export function request(config) {
    // 创建axios实例
    const instance = axios.create({
        baseURL: 'http://localhost/api',
        // timeout: 5000,
    })
    //发送请求
    return instance(config)
}

//外界使用方法
// request({
//     url: '/admin/search',
// }).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })
// 疑问，目前只能做get请求