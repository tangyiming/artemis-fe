import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)
// 避免重复同导航跳转报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/404',
            name: '404',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "customUpload" */ './views/404'),
        },
        {
            path: '/apitest',
            name: 'apitest',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "customUpload" */ './views/apitest'),
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "customUpload" */ './views/login'),
        },
        {
            path: '/doc',
            name: 'doc',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "customUpload" */ './views/doc'),
        },
        {
            path: '/perftest',
            name: 'perftest',
            component: () => import('./views/perftest'),
            children: [
                {
                    path: 'dashboard',
                    // eslint-disable-next-line prettier/prettier
                    component: require('./views/perftest/dashBoard').default,
                },
                {
                    path: 'h5execute',
                    // eslint-disable-next-line prettier/prettier
                    component: require('./views/perftest/h5Execute').default,
                },
                {
                    path: 'h5results',
                    // eslint-disable-next-line prettier/prettier
                    component: require('./views/perftest/h5Results').default,
                },
                {
                    path: 'loadexecute',
                    // eslint-disable-next-line prettier/prettier
                    component: require('./views/perftest/loadExecute').default,
                },
                {
                    path: 'loadresults',
                    // eslint-disable-next-line prettier/prettier
                    component: require('./views/perftest/loadResults').default,
                },
            ],
        },
        {
            path: '/*',
            name: '404',
            component: () => import('./views/404'),
        },
    ],
})
