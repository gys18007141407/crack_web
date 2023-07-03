import { createRouter,createWebHistory} from 'vue-router'
import layout from "@/layout/layout";
export const constantRoutes = [
    {
        path: '/',
        redirect:'/login',
    },
    {
        path: '/login',
        component: () => import('@/views/login/login'),
    },
    {
        path: '/register',
        component: () => import('@/views/register/register'),
    },
    {
        path: '/identify',
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/views/identify/identify'),
            }
        ]
    },
    {
        path: '/datasets',
        redirect: '/datasets/edit',
        component: layout,
        children: [
            {
                path: 'edit',
                component: () => import('@/views/datasets/edit_dataset')
            },
            {
                path: 'create',
                component: () => import('@/views/datasets/create_dataset')
            },
            {
                path: 'expand',
                component: () => import('@/views/datasets/expand_dataset')
            }
        ]
    },
    {
        path: '/models',
        component: layout,
        redirect: '/models/train',
        children: [
            {
                path: 'train',
                component: () => import('@/views/models/train_model')
            },
            {
                path: 'fine_tune',
                component: () => import('@/views/models/fine_tune')
            }
        ]
    },
    {
        path: '/logs',
        component: layout,
        children: [
            {
                path: '',
                component: () => import('@/views/logs/logs'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

router.beforeEach((to, from, next) => {
    //判断是否登录
    if (to.path !== '/login' && to.path !== '/register' && window.localStorage.getItem("crack_login") !== 'true') {
        console.log("请先登录");
        next("/login")
    } else if (to.path === '/login' && window.localStorage.getItem("crack_login") === 'true') {
        next('/identify')
    } else {
        next()
    }
})

export default router
