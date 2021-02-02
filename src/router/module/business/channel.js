import Main from '@/components/main';
// t_peony路由
export const channel = [
    {
        path: '/channel',
        name: 'channel',
        component: Main,
        meta: {
          title: '渠道管理',
          icon: 'icon iconfont iconzujian',
          topMenu:true,
        },  
    }
];
