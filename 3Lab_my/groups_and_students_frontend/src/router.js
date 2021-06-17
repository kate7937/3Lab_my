import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '/groups',
            component: () => import("./components/groups.vue")
        },
        {
            path: '/users',
            name: 'users',
            component: () => import("./components/users.vue")
        }
    ]
})