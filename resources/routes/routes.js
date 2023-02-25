import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
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
        }
    ],
});

// router.beforeEach((to, from, next) => {
//     if (to.path !== '/' && to.path !== '/register' && !isAuthenticated()) {
//         return next({path: '/'})
//     }
//     return next()
// });

// function isAuthenticated() {
//     return Boolean(localStorage.getItem('APP_DEMO_USER_TOKEN'))
// }

export default router;