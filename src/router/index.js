import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/mytable',
    component: Layout,
    redirect: '/mytable/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/equip-table/index'),
        name: 'Equipment Table',
        meta: { title: 'Equipment Table', icon: 'table', noCache: true }
      }
    ]
  },
  {
    path: '/motor',
    component: Layout,
    redirect: '/motor/realtime-monitor/1',
    meta: { title: 'motorRealTime', icon: 'real-time', noCache: true },
    children: [
      {
        path: 'realtime-monitor/:id(\\d+)',
        component: () => import('@/views/realtime-monitor/index'),
        name: 'Realtime-monitor',
        meta: { title: 'Motor Realtime', icon: 'real-time', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/symmetry',
    component: Layout,
    redirect: '/symmetry/index/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/sym-analysis/index'),
        name: 'Symmetry Analysis',
        meta: { title: 'Symmetry Analysis', icon: 'symmentry', noCache: true }
      }
    ]
  },
  {
    path: '/dq',
    component: Layout,
    redirect: '/dq/index/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dq-analysis/index'),
        name: 'DQZ transform',
        meta: { title: 'DQZ Transform', icon: 'dq', noCache: true }
      }
    ]
  },
  {
    path: '/trend-analysis',
    component: Layout,
    redirect: '/trend-analysis/index/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/trend-analysis/index'),
        name: 'Trend Analysis',
        meta: { title: 'Trend Analysis', icon: 'trend', noCache: true }
      }
    ]
  },
  {
    path: '/harmonics',
    component: Layout,
    redirect: '/harmonics/index/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/harmonic-analysis/index'),
        name: 'Harmonics Analysis',
        meta: { title: 'Harmonics Analysis', icon: 'harmonics', noCache: true }
      }
    ]
  },
  {
    path: '/envelope',
    component: Layout,
    redirect: '/envelope/index/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/env-analysis/index'),
        name: 'Envelope Analysis',
        meta: { title: 'Envelope Analysis', icon: 'envelope', noCache: true }
      }
    ]
  },
  {
    path: '/diagnosis',
    component: Layout,
    redirect: '/diagnosis/index/',
    children: [
      {
        path: 'index',
        component: () => import('@/views/diagnosis/index'),
        name: 'Motor Diagnosis',
        meta: { title: 'Motor Diagnosis', icon: 'diag', noCache: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/error',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
