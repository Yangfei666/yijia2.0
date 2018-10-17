import axios from 'axios'

axios.defaults.timeout = 2500;
// axios.defaults.withCredentials = true;// 携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.response.use(
  response => {/*请求成功的设置*/
    let newToken=response.config.headers.token
    sessionStorage.setItem('access-token', newToken);
    if(response.data.code==-1&&response.status==200){
      this.$message({showClose: true, message:response.data.msg, type: 'warning'});
    };
    return response;
  },
  error => {/*token过期跳转*/
    if (error.response) {
      if(error.response.data.code==401){
        this.$router.push('/login');
      }
    }
  });

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