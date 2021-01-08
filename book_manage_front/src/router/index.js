import Vue from 'vue'
import VueRouter from 'vue-router'

// 不能懒加载？？？
import login from '../views/register.vue'
import Home from '../views/the_view_distort.vue'
import personnal from '../views/personnal.vue'
import book_store from '../views/book_store.vue'
import home from '../views/home.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
