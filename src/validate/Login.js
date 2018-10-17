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
            trigger: "blur"
        }
    ];

/* 验证状态 */
export let status = [
        {
            required: true,
            message: "请选择状态",
            trigger: "blur"
        }
    ];

/* 验证课程封面 */
export let filecover = [
        {
            required: true,
            message: "请选择课程封面",
            trigger: "blur"
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
            trigger: "blur"
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
            required:true,
            message: "请输入身份证号",
            trigger: "blur"
        },
        {
            pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message:"身份证号码不符合规范"
        }
        
    ];
/* 验证分配角色 */
export let role = [
        {
            required:true,
            message: "请选择分配角色",
            trigger: "change"
        }
    ];
/* 验证所属权限 */
export let power = [
        {
            required:true,
            message: "请选择所属权限",
            trigger: "change"
        }
    ];
/* 验证角色名称 */
export let rolename = [
        {
            required:true,
            message: "请输入角色名称",
            trigger: "blur"
        }
    ];
/* 验证体验卷名称 */
export let experiencename = [
        {
            required:true,
            message: "请输入体验卷名称",
            trigger: "blur"
        }
    ];
/* 验证类型*/
export let type = [
        {
            required:true,
            message: "请选择类型",
            trigger: "blur"
        }
    ];
/* 验证价格*/
export let price = [
        {
            required:true,
            message: "请输入价格",
            trigger: "blur"
        }
    ];
/* 验证有效期*/
export let termvalidity = [
        {
            required:true,
            message: "请输入有效期",
            trigger: "blur"
        }
    ];
/* 验证次数*/
export let number = [
        {
            required:true,
            message: "请输入次数",
            trigger: "blur"
        }
    ];
