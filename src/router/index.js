import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载引入
const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

const routes = [
  { path: '/', component: Home,redirect: './home' },
  { path: '/home', component: Home },
  { path: '/cart', component: Cart },
  { path: '/category', component: Category },
  { path: '/profile', component: Profile },
  { path: '/detail', component: Detail }
]
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode:'history'
})

// 冗余导航
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

export default router

