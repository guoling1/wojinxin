import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'
import Order from '@/components/Order'
import OrderDetail from '@/components/OrderDetail'
import My from '@/components/My'
import HomeDetail from '@/components/HomeDetail'
import ShopInfor from '@/components/ShopInfor'
import WritePhone from '@/components/WritePhone'
import PayMethod from '@/components/PayMethod'
import OrderSubmit from '@/components/OrderSubmit'
import SelectPhone from '@/components/SelectPhone'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component: MainMenu,
      children:[
      	{
      		path:'/home',
      		name:'home',
          meta:{
            title:"沃金信"
          },
      		component:Home
      	},
        {
          path:'/order',
          name:'order',
          meta:{
            title:"沃金信"
          },
          component:Order
        },
        {
          path:'/my',
          name:'my',
          meta:{
            title:"沃金信"
          },
          component:My
        },
        {
          path:'/orderDetail',
          name:'orderDetail',
          meta:{
            title:"订单详情"
          },
          component:OrderDetail
        },
      ]
    },
    {
      path:'/homeDetail',
      name:'homeDetail',
      meta:{
        title:"详情"
      },
      component: HomeDetail
    },
    {
      path:'/shopInfor',
      name:'shopInfor',
      meta:{
        title:"沃金信"
      },
      component: ShopInfor
    },
    {
      path:'/writePhone',
      name:'writePhone',
      meta:{
        title:"支付订单"
      },
      component: WritePhone
    },
    {
      path:'/payMethod',
      name:'payMethod',
      meta:{
        title:"支付订单"
      },
      component: PayMethod
    }
    ,
    {
      path:'/orderSubmit',
      name:'orderSubmit',
      meta:{
        title:"订单提交成功"
      },
      component: OrderSubmit
    },
    {
      path:'/selectPhone',
      name:'selectPhone',
      meta:{
        title:"手机号选择"
      },
      component: SelectPhone
    }
  ]
})
