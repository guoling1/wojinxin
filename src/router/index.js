import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Home from '@/components/Home'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
        }
      ]
    }
  ]
})
