/**
 * 用来模拟用户的一些信息
 */
import Mock from 'mockjs'
const LoginUsers = [{
    id: 1,
    username: 'admin',
    password: 'admin',
    verifycode: 'abcd',
    email: '123456789@qq.com',
    name: '程序员'
}]

const users=[];

for (let i = 0; i < 86; i++) {
    users.push(Mock.mock({
      name: Mock.Random.cname(),
    }));
  }

export { LoginUsers, users }