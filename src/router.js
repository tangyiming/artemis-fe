import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/404',
            name: '404',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "customUpload" */ './views/404')
        },
        {
            path: '/resume',
            name: 'resume',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "customUpload" */ './views/resume')
        },
        {
            path: '/perftest',
            name: 'perftest',
            component: () => import('./views/perftest'),
            children: [
                {
                    path: 'dashboard',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/perftest/dashBoard').default
                },
                {
                    path: 'h5execute',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/perftest/h5Execute').default
                },
                {
                    path: 'h5results',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/perftest/h5Results').default
                },
                {
                    path: 'loadexecute',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/perftest/loadExecute').default
                },
                {
                    path: 'loadresults',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/perftest/loadResults').default
                }
            ]
        },
        {
            path: '/toolset',
            name: 'toolset',
            component: () => import('./views/toolset'),
            children: [
                {
                    path: 'smscodequery',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/toolset/smsCodeQuery').default
                },
                {
                    path: 'userinfoquery',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/toolset/userInfoQuery').default
                },
                {
                    path: 'userinfoadd',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/toolset/userInfoAdd').default
                },
                {
                    path: 'testassertmanage',
                    // eslint-disable-next-line prettier/prettier
                    component: require( './views/toolset/testAssertManage').default
                }
            ]
        }
    ]
})
