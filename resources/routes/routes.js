import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active-link',
    routes: [
        {
            path: '/login',
            component: () => import('../pages/Auth/Login/Login.vue')
        },
        {
            path: '/register',
            component: () => import('../pages/Auth/Register/Register.vue')
        },
        {
            path: '/forgot-password',
            component: () => import('../pages/Auth/ForgotPassword/ForgotPassword.vue')
        },
        {
            path: '/browse',
            component: () => import('../pages/Browse/Browse.vue')
        },
        {
            path: '/admin/categories',
            component: () => import('../pages/Admin/Categories/Categories.vue')
        },
        {
            path: '/admin/food',
            component: () => import('../pages/Admin/Food/Food.vue')
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (!isAuthenticated()) {
        if (to.path == '/login' || to.path == '/register' || to.path == '/forgot-password') return next();
        return next('/login');
    }

    if (to.path == '/login' || to.path == '/register' || to.path == '/forgot-password') return next('/browse');
    return next();
});

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
}

export default router;
