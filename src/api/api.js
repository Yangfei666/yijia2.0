import axios from 'axios'

axios.defaults.timeout = 2500;
// axios.defaults.withCredentials = true;// 携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

export const requestLogin = (url, params, method, baseURL, responseType) => {
  return axios({
    method: method ? method : 'post', //方法
    url: url, //地址
    data: params, // 参数,
    headers: { 'token': sessionStorage.getItem('access-token')},
    baseURL: baseURL === false ? '' : '/api',
    responseType: responseType ? responseType : 'json'
  }).then(res => res.data);
}
