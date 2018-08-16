let childs = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main'),
    meta: {
      requireAuth: true
    }
  },
  // 二级页面
  {
    path: '/basic/:secondName/:secondData',
    name: 'allBasic',
    component: () => import('@/views/opManage')
  },
  // 基础管理 -- 账号管理
  {
    path: '/baseAcount',
    name: 'baseAcount',
    component: () => import('@/views/base/baseAcount')
  },
  // 基础管理 -- 组织管理
  {
    path: '/organization',
    name: 'organization',
    component: () => import('@/views/base/organization')
  },
  // 基础管理 -- 角色管理
  {
    path: '/role',
    name: 'role',
    component: () => import('@/views/base/role')
  },
  // 基础管理 -- 系统公告
  {
    path: '/systemNotice',
    name: 'systemNotice',
    component: () => import('@/views/base/systemNotice')
  },
  // 基础管理 -- 菜单管理
  {
    path: '/menuManage',
    name: 'menuManage',
    component: () => import('@/views/base/menuManage')
  },
  // 结算管理 -- 交易账户
  {
    path: '/trading',
    name: 'trading',
    component: () => import('@/views/account/trading')
  },
  // 结算管理 -- 交易账户明细
  {
    path: '/tradingDetail',
    name: 'tradingDetail',
    component: () => import('@/views/account/tradingDetail')
  },
  // 系统管理 -- 物流公司管理
  {
    path: '/logistics',
    name: 'logistics',
    component: () => import('@/views/system/logistics')
  },
  // 系统管理 -- 区域公司管理
  {
    path: '/regional',
    name: 'regional',
    component: () => import('@/views/system/regional')
  },
  // 系统管理 -- 行政区域维护
  {
    path: '/administrative',
    name: 'administrative',
    component: () => import('@/views/system/administrative')
  },
  // 系统管理 -- 分拨中心管理
  {
    path: '/hinge',
    name: 'hinge',
    component: () => import('@/views/system/hinge')
  },
  // 系统管理 -- 月结设置
  {
    path: '/statement',
    name: 'statement',
    component: () => import('@/views/system/statement')
  },
  // 系统管理 -- 价格设置
  {
    path: '/priceSet',
    name: 'priceSet',
    component: () => import('@/views/system/priceSet')
  },
  // 系统管理 -- 银行卡管理
  {
    path: '/bankManage',
    name: 'bankManage',
    component: () => import('@/views/system/bankManage')
  }
];
export default childs;
