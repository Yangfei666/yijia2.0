import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8080';

export const requestLogin = params => { return axios.post('/login', params).then(res => res.data) }