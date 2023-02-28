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

const isAuthenticated = () => {
    return false;
}

router.beforeEach((to, from, next) => {
    console.log('before each logic');
    if (to.path == '/login' || to.path == '/register' || to.path == 'forgot-password') {
        return next();
    }

    if (isAuthenticated()) {
        return next();
    }
    else {
        return next('login');
    }
    // if (isAuthenticated()) {
    //     return next();
    // }
    // else {
    //     return next('/login')
    // }
    // if (to.path !== '/' && to.path !== '/register' && !isAuthenticated()) {
    //     return next({path: '/'})
    // }
    // return next()
});

// function isAuthenticated() {
//     return Boolean(localStorage.getItem('APP_DEMO_USER_TOKEN'))
// }

export default router;
