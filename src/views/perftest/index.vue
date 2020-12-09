<template>
    <a-layout>
        <a-layout-sider collapsible v-model="collapsed" class="sider">
            <left-sider :menuList="menuList" :key="siderKey" />
        </a-layout-sider>
        <a-layout>
            <a-layout-content style="margin: 16px 16px">
                <router-view />
            </a-layout-content>
            <my-footer />
        </a-layout>
    </a-layout>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Footer from '@/components/Footer'

export default {
    components: {
        'my-footer': Footer,
    },
    data() {
        return {
            collapsed: false,
            //菜单
            menuList: [
                {
                    key: 'dashboard',
                    path: '/perftest/dashboard',
                    title: 'Dashboard',
                    icon: 'bar-chart',
                },
                {
                    key: 'h5',
                    title: '前端性能',
                    icon: 'chrome',
                    children: [
                        {
                            key: 'h5execute',
                            path: '/perftest/h5execute',
                            title: '测试执行',
                            icon: 'thunderbolt',
                        },
                        {
                            key: 'h5results',
                            path: '/perftest/h5results',
                            title: '测试列表',
                            icon: 'ordered-list',
                        },
                    ],
                },
                {
                    key: 'load',
                    title: '后端性能',
                    icon: 'api',
                    children: [
                        {
                            key: 'loadexecute',
                            path: '/perftest/loadexecute',
                            title: '测试执行',
                            icon: 'thunderbolt',
                        },
                        {
                            key: 'loadresults',
                            path: '/perftest/loadresults',
                            title: '测试列表',
                            icon: 'ordered-list',
                        },
                    ],
                },
            ],
        }
    },
    computed: {
        ...mapState({
            openKey: (state) => state.openKey,
            activeSider: (state) => state.activeSider,
            siderKey: (state) => state.siderKey,
        }),
    },
    watch: {
        openKey: function () {
            this.setSiderKey(this.siderKey + 1)
        },
    },
    beforeMount() {
        this.setMenuList(this.menuList)
    },
    methods: {
        ...mapActions(['setMenuList', 'setSiderKey']),
    },
}
</script>
<style lang="less" scoped>
.sider {
    overflow: auto;
    height: calc(100vh - 64px);
    left: 0;
}
</style>
