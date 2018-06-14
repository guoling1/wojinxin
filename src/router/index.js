import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'
import Order from '@/components/Order'
import OrderDetail from '@/components/OrderDetail'
import My from '@/components/My'
import HomeDetail from '@/components/HomeDetail'

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
    }
  ]
})
