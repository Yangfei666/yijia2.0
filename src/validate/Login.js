/* 验证电话 */
export let tel = [
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

/* 验证课程名称 */
export let classname = [
    {
        required: true,
        message: "请输入课程名称",
        trigger: "blur"
    }
];

/* 验证热度 */
export let heat = [
    {
        required: true,
        message: "请选择热度",
        trigger: "change"
    }
];

/* 验证状态 */
export let status = [
    {
        required: true,
        message: "请选择状态",
        trigger: "change"
    }
];

/* 验证课程封面 */
export let filecover = [
    {
        required: true,
        message: "请选择课程封面",
        trigger: "change"
    }
];
/* 验证姓名 */
export let name = [
    {
        required: true,
        message: "请输入姓名",
        trigger: "blur"
    }
];
/* 验证性别 */
export let sex = [
    {
        required: true,
        message: "请选择性别",
        trigger: "change"
    }
];
/* 验证电话 */
export let phone = [
    {
        required: true,
        message: "请输入电话",
        trigger: "blur"
    },
    {
        pattern: /^[1][3,5,6,7,8,9][0-9]{9}$/,
        message: "格式错误"
    }
];
/* 验证身份证号 */
export let idnumber = [
    {
        required: true,
        message: "请输入身份证号",
        trigger: "blur"
    },
    {
        pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        message: "身份证号码不符合规范",
        trigger: "blur"
    }

];
/* 验证分配角色 */
export let selectRoleId = [
    {
        required: true,
        message: "请选择分配角色",
        trigger: "blur"
    }
];
/* 验证所属权限 */
export let power = [
    {
        required: true,
        message: "请选择所属权限",
        trigger: "change"
    }
];
/* 验证角色名称 */
export let rolename = [
    {
        required: true,
        message: "请输入角色名称",
        trigger: "blur"
    }
];
/* 验证体验券名称 */
export let experiencename = [
    {
        required: true,
        message: "请输入体验券名称",
        trigger: "blur"
    }
];
/* 验证类型*/
export let type = [
    {
        required: true,
        message: "请选择类型",
        trigger: "blur"
    }
];
/* 验证等级*/
export let appointmentTime = [
    {
        required: true,
        message: "请选择约课等级",
        trigger: "blur"
    }
];
/* 验证价格*/
export let price = [
    {
        required: true,
        message: "请输入价格",
        trigger: "blur"
    }
];
/* 验证有效期*/
export let termvalidity = [
    {
        required: true,
        message: "请输入有效期",
        trigger: "blur"
    }
];
/* 验证次数*/
export let number = [
    {
        required: true,
        message: "请输入次数",
        trigger: "blur"
    }
];
/* 验证门店名称*/
export let roomname = [
    {
        required: true,
        message: "请输入门店名称",
        trigger: "blur"
    }
];
/* 验证门店别名*/
export let roombyname = [
    {
        required: true,
        message: "请输入门店别名",
        trigger: "blur"
    }
];
/* 验证邮编*/
export let zipcode = [
    {
        required: true,
        message: "请输入邮编",
        trigger: "blur"
    },
    {
        min: 6,
        message: "邮编长度最低为6位",
        trigger: "blur"
    }
];
/* 验证法人*/
export let corporation = [
    {
        required: true,
        message: "请输入法人",
        trigger: "blur"
    }
];
/* 验证城市*/
export let homecity = [
    {
        required: true,
        message: "请输入城市",
        trigger: "blur"
    }
];
/* 验证地址*/
export let detadaddress = [
    {
        required: true,
        message: "请输入地址",
        trigger: "blur"
    },
    {
        min: 8,
        message: "地址长度最低为8位",
        trigger: "blur"
    }
];
/* 验证传真*/
export let portraiture = [
    {
        required: true,
        message: "请输入传真",
        trigger: "blur"
    },
    {
        max: 6,
        message: "传真长度最低为6位",
        trigger: "blur"
    }
];
/* 验证卡名称*/
export let cardname = [
    {
        required: true,
        message: "请输入卡名称",
        trigger: "blur"
    }
];
/* 验证课程种类*/
export let classtype = [
    {
        required: true,
        message: "请选择课程种类",
        trigger: "change"
    }
];
/* 验证底色*/
export let memcolor = [
    {
        required: true,
        message: "请选择底色",
        trigger: "change"
    }
];
/* 验证有效期*/
export let date = [
    {
        required: true,
        message: "请输入有效期",
        trigger: "blur"
    }
];
/* 验证次数*/
export let num = [
    {
        required: true,
        message: "请选择次数",
        trigger: "change"
    }
];
/* 验证微信*/
export let wechat = [
    {
        required: true,
        message: "请输入微信",
        trigger: "blur"
    }
];
/* 验证会籍顾问*/
export let adviser = [
    {
        required: true,
        message: "请选择会籍顾问",
        trigger: "blur"
    }
];
/* 验证质量*/
export let quality = [
    {
        required: true,
        message: "请选择客户质量",
        trigger: "change"
    }
];
/* 验证备注*/
export let desc = [
    {
        required: true,
        message: "请输入备注",
        trigger: "blur"
    }
];
/* 验证付款方式*/
export let mode = [
    {
        required: true,
        message: "请选择付款方式",
        trigger: "change"
    }
];
/* 验证激活时间*/
export let sensitize = [
    {
        required: true,
        message: "请选择激活时间",
        trigger: "change"
    }
];
/* 验证到期时间*/
export let become = [
    {
        required: true,
        message: "请选择到期时间",
        trigger: "change"
    }
];
/* 验证是否启动*/
export let start = [
    {
        required: true,
        message: "请选择是否启动",
        trigger: "blur"
    }
];
/* 验证请假时间*/
export let leavedate = [
    {
        required: true,
        message: "请选择请假时间",
        trigger: "change"
    }
];
/* 验证教室名称*/
export let classroom = [
    {
        required: true,
        message: "请输入教室名称",
        trigger: "blur"
    }
];
/* 验证教室类型*/
export let sign = [
    {
        required: true,
        message: "请选择教室类型",
        trigger: "change"
    }
];
/* 验证门店*/
export let shoproom = [
    {
        required: true,
        message: "请选择门店 ( 包括自己所在的门店,至少2个 )",
        trigger: "change"
    }
];
/* 验证优先级*/
export let priority = [
    {
        required: true,
        message: "请选择优先级",
        trigger: "change"
    }
];
/* 验证储物柜编号*/
export let priorityid = [
    {
        required: true,
        message: "请输入储物柜编号",
        trigger: "blur"
    }
];
/* 验证时段*/
export let limittime = [
    {
        required: true,
        message: "请选择是否限用时段",
        trigger: "change"
    }
];
