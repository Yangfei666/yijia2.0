import Vue from 'vue'
import Router from 'vue-router'

//懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/pages/Login'], resolve)//登录

const Home = resolve => require(['@/pages/Home'], resolve)//首页

const Main = resolve => require(['@/pages/Main'], resolve)//主页

const Forbidden = resolve => require(['@/pages/House/403'], resolve)//403

const NotFound = resolve => require(['@/pages/House/404'], resolve)//404

const ServerError = resolve => require(['@/pages/House/500'], resolve)//500

const CurriGroup = resolve => require(['@/pages/Curriculum/group'], resolve)//团课课程表

const CurriPrivateCulum = resolve => require(['@/pages/Curriculum/privateculum'], resolve)//私教课程表

const CurriCourse = resolve => require(['@/pages/Curriculum/course'], resolve)//课程科目管理

const League = resolve => require(['@/pages/Customer/league'], resolve)//会员客户管理

const Leaguermanage = resolve => require(['@/pages/Customer/leaguer/leaguermanage'], resolve)//会员客户管理---会员管理

const Cardopenaudit = resolve => require(['@/pages/Customer/leaguer/cardopenaudit'], resolve)//会员客户管理---开卡审核

const CustomerPractice = resolve => require(['@/pages/Customer/practice'], resolve)//体验客户管理

const CustomerBargain = resolve => require(['@/pages/Customer/bargain'], resolve)//定金客户管理

const CustomerLatent = resolve => require(['@/pages/Customer/latent'], resolve)//潜在客户管理

// const RoutineRotation = resolve => require(['@/pages/Routine/rotation'], resolve)//轮播图管理

const RoutineClub = resolve => require(['@/pages/Routine/club'], resolve)//会所信息管理

const HouseStaff = resolve => require(['@/pages/House/staff'], resolve)//员工管理

const HouseRole = resolve => require(['@/pages/House/role'], resolve)//角色权限管理

const HouseExperience = resolve => require(['@/pages/House/experience'], resolve)//体验券设置

const HouseMembership = resolve => require(['@/pages/House/membership'], resolve)//会员卡管理

const Visualiza = resolve => require(['@/pages/House/visualiza'], resolve)//可视化数表

const Visualization = resolve => require(['@/pages/House/visualizationchart/visualization'], resolve)//会所业绩图表

const Staffearningreport = resolve => require(['@/pages/House/visualizationchart/staffearningreport'], resolve)//员工业绩报表

const Instructorclassrecord = resolve => require(['@/pages/House/visualizationchart/instructorclassrecord'], resolve)//教练上课记录

const Individualcenter = resolve => require(['@/pages/House/individualcenter'], resolve)//个人中心

const TasteFollow = resolve => require(['@/components/tastefollowup'], resolve)//体验客户跟进

const MemberFollowup = resolve => require(['@/components/memberfollowup'], resolve)//会员客户管理---会员客户跟进

const Membershiphome = resolve => require(['@/components/membershiphome'], resolve)//会员客户管理---体验客户主页

const Experiencehome = resolve => require(['@/components/experiencehome'], resolve)//体验客户管理---会员管理---会员主页

const Potentialfollowup = resolve => require(['@/components/potentialfollowup'], resolve)//潜在客户管理---潜在客户跟进

const Depositfollowup = resolve => require(['@/components/depositfollowup'], resolve)//定金客户管理--定金客户跟进

const Information = resolve => require(['@/components/information'], resolve)//综合信息

const Information2 = resolve => require(['@/components/information2'], resolve)//综合信息

const Leave = resolve => require(['@/components/leave'], resolve)//请假销假操作

const Unhook = resolve => require(['@/components/unhook'], resolve)//解挂--挂失--补卡操作

const Change = resolve => require(['@/components/change'], resolve)//换会籍

const Nocards = resolve => require(['@/components/nocards'], resolve)//不办卡

const Operationnote = resolve => require(['@/components/operationnote'], resolve)//操作记录

const Classcard = resolve => require(['@/components/classcard'], resolve)//上课记录--体验

const Classcard2 = resolve => require(['@/components/classcard2'], resolve)//上课记录--会员

const Memberhome = resolve => require(['@/components/memberhome'], resolve)//会员主页

const Experhome = resolve => require(['@/components/experhome'], resolve)//体验客户主页

const Memberup = resolve => require(['@/components/memberup'], resolve)//潜在跟进记录

const Bargainup = resolve => require(['@/components/bargainup'], resolve)//定金跟进记录

const Practiceup = resolve => require(['@/components/practiceup'], resolve)//体验跟进记录

const Insiderup = resolve => require(['@/components/insiderup'], resolve)//会员跟进记录

const Healthsurvey = resolve => require(['@/components/healthsurvey'], resolve)//健康调查表

const Staminaevaluating = resolve => require(['@/components/staminaevaluating'], resolve)//体能评估表

const Postureevaluating = resolve => require(['@/components/postureevaluating'], resolve)//体态评估表

const Transfercard = resolve => require(['@/components/transfercard'], resolve)//转卡

const Returncard = resolve => require(['@/components/returncard'], resolve)//退卡

const Upgradecard = resolve => require(['@/components/upgradecard'], resolve)//升级

const Changevalidity = resolve => require(['@/components/changevalidity'], resolve)//变更有效期

const Changepriceandnum = resolve => require(['@/components/changepriceandnum'], resolve)//变更次数和金额

const Enabledisabling = resolve => require(['@/components/enabledisabling'], resolve)//启用禁用

const Activate = resolve => require(['@/components/activate'], resolve)//激活

const Claim = resolve => require(['@/components/claim'], resolve)//认领

const Latenttable = resolve => require(['@/components/latenttable'], resolve)//潜在表格

const Bargaintable = resolve => require(['@/components/bargaintable'], resolve)//定金表格

const Practicetable = resolve => require(['@/components/practicetable'], resolve)//体验表格

const Leaguermanagetable = resolve => require(['@/components/leaguermanagetable'], resolve)//会员表格

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,//登录
        },{
            path: '/login',
            name: 'Login',
            component: Login,//登录
        }, {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/main',
            leaf: true,//只有一个节点
            menuShow: true,
            iconCls: 'iconfont icon-bijibendiannao',// 图标样式class
            children: [
                { path: '/home/main', component: Main, name: '首页', menuShow: true }//首页
            ]
        }, {
            path: '/Curriculum',
            component: Home,
            name: '课程管理',
            menuShow: true,
            iconCls: 'iconfont icon-085shucezhongxin',
            children: [
                { path: '/Curriculum/group', component: CurriGroup, name: '团课课程表', menuShow: true },//团课课程表
                { path: '/Curriculum/privateculum', component: CurriPrivateCulum, name: '私教课程表', menuShow: true },//私教课程表
                { path: '/Curriculum/course', component: CurriCourse, name: '课程科目管理', menuShow: true }//课程科目管理
            ]
        }, {
            path: '/Customer',
            component: Home,
            name: '客户管理',
            menuShow: true,
            iconCls: 'iconfont icon-yonghu',
            children: [
                {
                    path: '/Customer/leaguer',//会员客户管理
                    name: '会员客户管理',
                    menuShow: true,
                    component: League,
                    children: [
                        {
                            path: '/Customer/leaguer/leaguermanage', component: Leaguermanage, name: '会员管理', menuShow: true, redirect: '/Customer/leaguer/leaguermanage/leaguermanagetable',//会员管理
                            children: [
                                { path: '/Customer/leaguer/leaguermanage/leaguermanagetable', component: Leaguermanagetable },//会员表格
                                { path: '/Customer/leaguer/leaguermanage/claim', component: Claim },//认领
                            ]
                        },
                        { path: '/Customer/leaguer/cardopenaudit', component: Cardopenaudit, name: '开卡审核', menuShow: true },//开卡审核
                    ]
                },
                {
                    path: '/Customer/practice', component: CustomerPractice, name: '体验客户管理', menuShow: true, redirect: '/Customer/practice/practicetable',//体验客户管理
                    children: [
                        { path: '/Customer/practice/practicetable', component: Practicetable },//体验表格
                        { path: '/Customer/practice/claim', component: Claim },//认领
                    ]
                },
                {
                    path: '/Customer/bargain', component: CustomerBargain, name: '定金客户管理', menuShow: true, redirect: '/Customer/bargain/bargaintable',//定金客户管理
                    children: [
                        { path: '/Customer/bargain/bargaintable', component: Bargaintable },//定金表格
                        { path: '/Customer/bargain/claim', component: Claim },//认领
                    ]
                },
                {
                    path: '/Customer/latent', component: CustomerLatent, name: '潜在客户管理', menuShow: true, redirect: '/Customer/latent/latenttable',//潜在客户管理
                    children: [
                        { path: '/Customer/latent/latenttable', component: Latenttable },//潜在表格
                        { path: '/Customer/latent/claim', component: Claim },//认领
                    ]
                },
                {
                    path: '/Customer/depositfollowup',//定金客户跟进
                    component: Depositfollowup,
                    name: '定金客户跟进',
                    menuShow: false,
                    redirect: '/Customer/depositfollowup/bargainup',
                    children: [
                        { path: '/Customer/depositfollowup/bargainup/:id/:itName/:itSex', component: Bargainup, name: 'Bargainup' },//定金跟进记录
                        { path: '/Customer/depositfollowup/healthsurvey', component: Healthsurvey},//健康调查表
                        { path: '/Customer/depositfollowup/staminaevaluating', component: Staminaevaluating, name: 'Staminaevaluating' },//体能评估表
                        { path: '/Customer/depositfollowup/postureevaluating', component: Postureevaluating, name: 'Postureevaluating' },//体态评估表
                    ]
                },
                {
                    path: '/Customer/potentialfollowup',//潜在客户跟进
                    component: Potentialfollowup,
                    name: '潜在客户跟进',
                    menuShow: false,
                    redirect: '/Customer/potentialfollowup/memberup',
                    children: [
                        { path: '/Customer/potentialfollowup/memberup/:id/:prName/:prSex', component: Memberup, name: 'Memberup' },//潜在跟进记录
                        { path: '/Customer/potentialfollowup/healthsurvey', component: Healthsurvey},//健康调查表
                        { path: '/Customer/potentialfollowup/staminaevaluating', component: Staminaevaluating},//体能评估表
                        { path: '/Customer/potentialfollowup/postureevaluating', component: Postureevaluating},//体态评估表
                    ]
                },
                {
                    path: '/Customer/tastefollowup', //体验客户跟进
                    component: TasteFollow,
                    name: '体验客户跟进',
                    menuShow: false,
                    redirect: '/Customer/tastefollowup/practiceup',
                    children: [
                        { path: '/Customer/tastefollowup/practiceup/:id/:exName/:exSex', component: Practiceup, name: 'Practiceup' },//体验跟进记录
                        { path: '/Customer/tastefollowup/healthsurvey', component: Healthsurvey},//健康调查表
                        { path: '/Customer/tastefollowup/staminaevaluating', component: Staminaevaluating},//体能评估表
                        { path: '/Customer/tastefollowup/postureevaluating', component: Postureevaluating},//体态评估表
                    ]
                },
                {
                    path: '/Customer/memberfollowup',//会员客户跟进
                    component: MemberFollowup,
                    name: '会员客户跟进',
                    menuShow: false,
                    redirect: '/Customer/memberfollowup/insiderup',
                    children: [
                        { path: '/Customer/memberfollowup/insiderup/:id/:HYName/:Sex', component: Insiderup, name: 'Insiderup' },//会员跟进记录
                        { path: '/Customer/memberfollowup/healthsurvey', component: Healthsurvey},//健康调查表
                        { path: '/Customer/memberfollowup/staminaevaluating', component: Staminaevaluating},//体能评估表
                        { path: '/Customer/memberfollowup/postureevaluating', component: Postureevaluating},//体态评估表
                    ]
                },
                {
                    path: '/Customer/membershiphome',
                    component: Membershiphome,
                    name: '会员主页',
                    menuShow: false,
                    redirect: '/Customer/membershiphome/memberhome',
                    children: [
                        {
                            path: '/Customer/membershiphome/memberhome/:HYID/:HYName/:MotoTel/:YGXX_NAME', //会员主页
                            component: Memberhome,
                            name: 'Memberhome',
                            children: [
                                { path: '/Customer/membershiphome/memberhome/transfercard/:HYID/:CARD', component: Transfercard, name: 'Transfercard' },//转卡
                                { path: '/Customer/membershiphome/memberhome/returncard/:HYID/:CARD', component: Returncard, name: 'Returncard' },//退卡
                                { path: '/Customer/membershiphome/memberhome/upgradecard/:HYID/:CARD', component: Upgradecard, name: 'Upgradecard' },//升级
                                { path: '/Customer/membershiphome/memberhome/changevalidity/:HYID/:CARD', component: Changevalidity, name: 'Changevalidity' },//变更有效期
                                { path: '/Customer/membershiphome/memberhome/changepriceandnum/:HYID/:CARD', component: Changepriceandnum, name: 'Changepriceandnum' },//变更次数和金额
                                { path: '/Customer/membershiphome/memberhome/enabledisabling/:HYID/:CARD', component: Enabledisabling, name: 'Enabledisabling' },//启用禁用
                                { path: '/Customer/membershiphome/memberhome/activate/:HYID/:CARD', component: Activate, name: 'Activate' },//激活
                            ]
                        },
                        { path: '/Customer/membershiphome/information/:HYID/:HYName/:MotoTel/:YGXX_NAME', component: Information, name: 'Information' },//综合信息
                        { path: '/Customer/membershiphome/leave/:HYID/:HYName/:MotoTel/:YGXX_NAME', component: Leave, name: 'Leave' },//请假销假操作
                        { path: '/Customer/membershiphome/unhook/:HYID/:HYName/:MotoTel/:YGXX_NAME', component: Unhook, name: 'Unhook' },//解挂--补卡--挂失
                        { path: '/Customer/membershiphome/change/:HYID/:HYName/:MotoTel/:YGXX_NAME', component: Change },//换会籍
                        { path: '/Customer/membershiphome/operationnote/:HYID/:HYName/:MotoTel/:YGXX_NAME', component: Operationnote, name: 'Operationnote' },//操作记录
                        { path: '/Customer/membershiphome/classcard2/:HYID/:HYName/:MotoTel/:YGXX_NAME', component: Classcard2, name: 'Classcard2' },//上课记录
                    ]
                },
                {
                    path: '/Customer/experiencehome',
                    component: Experiencehome,
                    name: '体验客户主页',
                    menuShow: false,
                    redirect: '/Customer/experiencehome/experhome',
                    children: [
                        { path: '/Customer/experiencehome/experhome/:id/:exHjgwName/:exName/:exTel/:exSex', component: Experhome, name: 'Experhome' },//体验主页
                        { path: '/Customer/experiencehome/information2/:id/:exHjgwName/:exName/:exTel/:exSex', component: Information2, name: 'Information2' },//综合信息
                        { path: '/Customer/experiencehome/nocards/:id/:exHjgwName/:exName/:exTel/:exSex', component: Nocards, name: 'Nocards' },//不办卡
                        { path: '/Customer/experiencehome/change/:id/:exHjgwName/:exName/:exTel/:exSex', component: Change },//换会籍
                        { path: '/Customer/experiencehome/classcard/:id/:exHjgwName/:exName/:exTel/:exSex', component: Classcard, name: 'Classcard' },//上课记录
                    ]
                }
            ]
        }, {
            path: '/Routine',
            component: Home,
            name: '小程序管理',
            menuShow: true,
            iconCls: 'iconfont icon-lianjie',
            children: [
                // { path: '/Routine/rotation', component: RoutineRotation, name: '轮播图管理', menuShow: true },//轮播图管理
                { path: '/Routine/club', component: RoutineClub, name: '会所信息管理', menuShow: true }//会所信息管理
            ]
        }, {
            path: '/House',
            component: Home,
            name: '会所管理',
            menuShow: true,
            iconCls: 'iconfont icon-shouye',
            children: [
                { path: '/House/staff', component: HouseStaff, name: '员工管理', menuShow: true },//员工管理
                { path: '/House/role', component: HouseRole, name: '角色权限管理', menuShow: true },//角色权限管理
                { path: '/House/experience', component: HouseExperience, name: '体验券设置', menuShow: true },//体验券设置
                { path: '/House/membership', component: HouseMembership, name: '会员卡管理', menuShow: true },//会员卡管理
                { path: '/House/individualcenter', component: Individualcenter, name: '个人中心', menuShow: false },//个人中心
                {
                    path: '/House/visualizationchart',//可视化数表
                    component: Visualiza,
                    name: '可视化数表',
                    menuShow: true,
                    children: [
                        { path: '/House/visualizationchart/visualization', component: Visualization, name: '会所业绩报表', menuShow: true },//会所业绩报表
                        { path: '/House/visualizationchart/staffearningreport', component: Staffearningreport, name: '员工业绩报表', menuShow: true },//员工业绩报表
                        { path: '/House/visualizationchart/instructorclassrecord', component: Instructorclassrecord, name: '教练上课记录', menuShow: true },//教练上课记录
                    ]
                },
                {
                    path: '/House/403', //403
                    component: Forbidden,
                    name: '403',
                    menuShow: false
                },
                {
                    path: '/House/404', //404
                    component: NotFound,
                    name: '404',
                    menuShow: false
                },
                {
                    path: '/House/500', //500
                    component: ServerError,
                    name: '500',
                    menuShow: false
                },
            ]
        },
    ]
})

// 访问之前，检查是否登录了
router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem('access-token')
        next()
    } else {
        let token = window.sessionStorage.getItem('access-token')
        if (!token) {
            next({ path: '/login' })
        } else {
            next()
        }
    }
})

export default router
