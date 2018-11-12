import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.timeout = 2500;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/* 请求拦截器 */

axios.interceptors.request.use(function (config) {
  let token = sessionStorage.getItem('access-token');
  if (token) {
    token = 'bearer' + ' ' + token.replace(/'|"/g, '')
    config.headers.common['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

/* 响应拦截器 */
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response) {
    switch(error.response.status){
      case 401:
        sessionStorage.removeItem('access-token');
        Message.error({
          message: '登录信息已失效，即将跳转至登录页面',
          type: 'error',
          duration: 3000
        });
        setTimeout(function () {
          window.location.href = "/login"
      }, 3000);
        break;
      case 403:
         window.location.replace('/House/403');
        break;
      case 404:
         window.location.replace('/House/404');
        break;
      case 500:
        router.replace({
          path: '/House/500'
        });
        break;
    }
  }
  return Promise.reject(error)
})

export const requestLogin = (url, params, method, baseURL, responseType) => {
  return axios({
    method: method ? method : 'post', //方法
    url: url, //地址
    data: params, // 参数,
    headers: { 'token': sessionStorage.getItem('access-token') },
    baseURL: baseURL === false ? '' : '/api',
    responseType: responseType ? responseType : 'json'
  }).then(res => res.data);
}
