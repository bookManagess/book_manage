
import Vue from 'vue'
import VueRouter from 'vue-router'

//用户界面
import login from '../views/login/register.vue'
import Home from '../views/admin/the_view_distort.vue'
import personnal from '../views/admin/personnal.vue'
import book_store from '../views/admin/book_store.vue'
import home from '../views/admin/home.vue'
import manager_home from '../views/manager/manager_home.vue'
import adminManage from '../views/manager/adminManage.vue'
import bookRecord from '../views/manager/bookRecord.vue'
import bookStore from '../views/manager/bookStore.vue'
import bookManage from '../views/manager/bookManage'
//管理员界面

// 测试swiper
import swiper from '../components/swiper/swiper.vue'

// const home = import('../views/home.vue')//？？？

Vue.use(VueRouter)

const routes = [
  // 测试
  {
    path: '/swiper',
    component: swiper,
  },
  // 
  {
    path: '/book',
    name: 'book',
    component: book_store,
  },
  {
    path: '/person',
    name: 'person',
    component: personnal
  },
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        component: home,
      },
      {
        path: 'person',
        // name: 'personal',
        component: personnal,
      },
      {
        path: 'book',
        component: book_store,
      },
    ]
  },
  {
    path: '/manager_home',
    component: manager_home,
    children: [
      {
        path: '',
        component: adminManage,
      },
      {
        path: 'bookRecord',
        // name: 'personal',
        component: bookRecord,
      },
      {
        path: 'bookStore',
        component: bookStore,
      },
      {
        path: 'bookManage',
        component: bookManage,
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
