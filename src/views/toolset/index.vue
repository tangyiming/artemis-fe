<template>
    <a-layout>
        <a-layout-sider collapsible v-model="collapsed" class="sider">
            <left-sider :menuList="menuList" :key="siderKey" />
        </a-layout-sider>
        <a-layout>
            <a-layout-content style="margin: 17px 25px">
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
        'my-footer': Footer
    },
    data() {
        return {
            collapsed: false,
            menuList: [
                // {
                //     key: 'smscodequery',
                //     path: '/perftest/smscodequery',
                //     title: '短信验证码查询',
                //     icon: 'mobile'
                // },
                // {
                //     key: 'userinfoquery',
                //     path: '/perftest/userinfoquery',
                //     title: '用户信息查询',
                //     icon: 'user'
                // },
                // {
                //     key: 'userinfoadd',
                //     path: '/perftest/userinfoadd',
                //     title: '测试用户构造',
                //     icon: 'usergroup-add'
                // },
                {
                    key: 'testassertmanage',
                    path: '/toolset/testassertmanage',
                    title: '测试资产管理',
                    icon: 'reconciliation'
                },
                {
                    key: 'mock',
                    path: '/toolset/mock',
                    title: 'Mock数据管理',
                    icon: 'medium'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            openKey: state => state.openKey,
            activeSider: state => state.activeSider,
            siderKey: state => state.siderKey
        })
    },
    watch: {
        openKey: function() {
            this.setSiderKey(this.siderKey + 1)
        }
    },
    beforeMount() {
        this.setMenuList(this.menuList)
    },
    methods: {
        ...mapActions(['setMenuList', 'setSiderKey'])
    }
}
</script>
