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
