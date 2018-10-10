import axios from 'axios'

axios.defaults.baseURL = '/api';
// const root = process.env.API_ROOT;

export const requestLogin = params => { return axios.post('/login', params).then(res => res.data) }