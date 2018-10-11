import axios from 'axios'

// axios.defaults.baseURL = '/api'18550105300;
// const root = process.env.API_ROOT;
const url = 'http://' + window.location.host

export const requestLogin = params => { return axios.post(url + '/pc/v1/getToken', params).then(res => res.data) }