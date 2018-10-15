/* 验证电话 */
export  let tel = [
    {
        required: true,
        message: "请输入帐号",
        trigger: "blur"
    },
    {
        pattern: /^[1][3,5,6,7,8,9][0-9]{9}$/,
        message: "格式错误"
    }
];

/* 验证密码 */
export let pwd = [
    {
        required: true,
        message: "请输入密码",
        trigger: "blur"
    },
    {
        min: 5,
        message: "密码长度最低为6位",
        trigger: "blur"
    }
];

/* 验证验证码 */
export let verifycode = [
    {
        required: true,
        message: "请输入验证码",
        trigger: "blur"
    }
];