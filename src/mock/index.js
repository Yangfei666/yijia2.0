// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import { LoginUsers} from './data/user'
// export default {
//     // init() {
//     //     let mock = new MockAdapter(axios)
//     //         // mock success request
//     //     mock.onGet('/success').reply(200, {
//     //         msg: 'success'
//     //     })

//     //     // mock error request
//     //     mock.onGet('/error').reply(500, {
//     //         msg: 'failure'
//     //     })

//     //     // 登录
//     //     // mock.onPost('/login').reply(config => {
//     //     //     let { username, password, verifycode } = JSON.parse(config.data)
//     //     //     return new Promise((resolve, reject) => {
//     //     //         let token = null;
//     //     //         setTimeout(() =>{
//     //     //             let hasUser = LoginUsers.some(u => {
//     //     //                 if (u.username === username && u.password === password && u.verifycode === verifycode) {
//     //     //                     token = JSON.parse(JSON.stringify(u));
//     //     //                     token.password = undefined;
//     //     //                     token.verifycode = undefined;
//     //     //                     return true
//     //     //                 }
//     //     //             });
//     //     //             if (hasUser) {
//     //     //                 resolve([200, { code: 200, msg: '请求成功', token: token }])
//     //     //             } else {
//     //     //                 resolve([200, { code: 500, msg: '账号或密码或者验证码错误' }])
//     //     //             }
//     //     //         },1000);
//     //     //     })
//     //     // })
//     // }
// }