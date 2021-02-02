import Main from '@/components/main';
// t_peony路由
export const allocation = [
    {
        path: '/home',
        name: 'home',
        redirect: '/home',
        component: Main,
        meta: {
            title: '任务配置',
            icon: 'icon iconfont icondingshirenwu',
            topMenu:true,
        }, 
    }
];
