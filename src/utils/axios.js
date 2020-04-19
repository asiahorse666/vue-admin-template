import axios from "axios"
import qs from 'qs'

const instance = axios.create({

})

// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 目的：批量添加或者请求的参数
    // post请求
    if(config.method.toUpperCase() == "POST" && config.data instanceof Object){
        config.data = qs.stringify(config.data) // 将data数据参数转换为urlencoding形式
    }

    return config;
})

// 添加响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        return new Promise(() => {}) // 手动返回一个状态为pending的promsie实例，保证不会自动进入下一个请求
    }
)
