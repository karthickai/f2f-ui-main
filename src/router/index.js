import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index.vue'
import About from '../views/index.vue'
import Login from '../views/login.vue'
import Signup from '../views/signup.vue'
import Forgot from '../views/forgot.vue'
import Pricing from '../views/pricing.vue'
import CheckOut from '../views/checkout.vue'
import Feedback from '../views/feedback.vue'
import SmartVideo from '../views/smart-video.vue'
import Invoices from '../views/invoices.vue'
import Subscription from '../views/subscription.vue'
import HomeLayout from '../layouts/home-layout.vue'
import ProfileLayout from '../layouts/profile-layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: HomeLayout }

  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { layout: HomeLayout }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: HomeLayout }

  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { layout: HomeLayout }

  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
    meta: { layout: HomeLayout }

  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: Subscription,
    meta: { layout: ProfileLayout }
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: Invoices,
    meta: { layout: ProfileLayout }

  },
  {
    path: '/smart-video',
    name: 'SmartVideo',
    component: SmartVideo,
    meta: { layout: ProfileLayout }

  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: { layout: ProfileLayout }

  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing,
    meta: { layout: HomeLayout }

  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: CheckOut,
    meta: { layout: HomeLayout }

  }
]

const router = new VueRouter({
  mode: 'history',
  hashbang: false,

  routes
})

export default router
