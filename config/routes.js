export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    routes: [
      {
        path: '/list',
        redirect: '/list/orderlist',
      },
      {
        name: 'order-list',
        path: '/list/orderlist',
        component: './TableList',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'security-settings',
        icon: 'smile',
        path: '/account/security-settings',
        component: './account/settings',
      },
      {
        name: 'roles',
        icon: 'smile',
        path: '/account/roles',
        component: './account/roles/roles',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
