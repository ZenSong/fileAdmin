
import Main from '@/components/main';

import { allocation } from './allocation';  
import { channel } from './channel'; 
// 业务
export const business = [
  {
    path: '/business',
    name: 'Business',
    component: Main,
    meta: {
      title: '',
      topMenu:true,
      icon: 'icon iconfont iconyoujianguanli'
    },
    children: [
      ...allocation,  
      ...channel,
    ]
  }
];
