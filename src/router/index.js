import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'
import Order from '@/components/Order'
import My from '@/components/My'

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
      		component:Home
      	},
        {
          path:'/order',
          name:'order',
          component:Order
        },
        {
          path:'/my',
          name:'my',
          component:My
        }
      ]
    }
  ]
})
