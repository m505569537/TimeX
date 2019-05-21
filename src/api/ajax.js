//封装axios
import Vue from 'vue'
import axios from 'axios'

//启用axios
Vue.prototype.axios = axios
//配置axios请求的固定域名前缀
// 因为在vue.config.js中设置了代理，不需要再写http://localhost:4000了
axios.defaults.baseURL = "/api";

export default function ajax  (url, data={}, type='GET',parameters ={})  {
    if(type==='GET'){
        let paramStr = ''
        Object.keys(data).forEach( item => {
            paramStr += item + '=' + data[item] + '&'
        })
        if(paramStr){
            paramStr = paramStr.substring(0,paramStr.length-1)
        }
        return axios.get(url + '?' + paramStr)
    } else if(type==='POST') {
        return axios.post(url, data, parameters)
    }
}

// axios.post(url, data, parameters) 路径，请求体，请求参数   
// parameters 包括 headers , params,query等