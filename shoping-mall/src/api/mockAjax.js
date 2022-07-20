// 对于axios进行二次封装
import axios from "axios";
import nProgress from "nprogress"; // 引入进度条插件
import "nprogress/nprogress.css"; // 引入进度条样式

// nProgress是个对象，start和done方法控制开始和结束

const requests = axios.create({
    baseURL:"/mock", // 经常发送请求时前面一样的话可以抽离出来
    timeout: 5000,
})


// 请求拦截器，可以在请求发出去之前做一些事
requests.interceptors.request.use((conf) => {
    nProgress.start();
    return conf;
})

// 响应拦截器，响应返回后拦截器可以检测到并做一些事
requests.interceptors.response.use((res) => {
    nProgress.done();
    return res.data
}, (err) =>{
    console.log("服务器响应错误===",err);
    return Promise.reject(new Error('fail'));
})

export default requests;