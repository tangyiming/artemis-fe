<template>
    <a-config-provider :locale="locale">
        <div>
            <a-layout id="components-layout-demo-top-side">
                <a-layout-header class="header">
                    <div class="logo">Artemis</div>
                    <!-- <a href="/">
                        <img
                            alt="site logo"
                            class="logo"
                            src="@/assets/images/logo.png"
                        />
                    </a> -->
                    <a-menu
                        theme="light"
                        mode="horizontal"
                        :defaultSelectedKeys="defaultSelectedKeys"
                        class="top-menu"
                        @click="handleMenuClick"
                        :key="headerKey"
                    >
                        <!-- 默认key值一定要与url路径xxx/key/xxxx相同 -->
                        <a-menu-item key="home">首页</a-menu-item>
                        <a-menu-item key="cicd">持续交付</a-menu-item>
                        <a-menu-item key="apitest">接口测试</a-menu-item>
                        <a-menu-item key="perftest">性能测试</a-menu-item>
                        <a-menu-item key="uitest">UI测试</a-menu-item>
                        <a-menu-item key="toolset">工具集</a-menu-item>
                    </a-menu>
                    <span class="top-right">
                        <!--                        <a-icon type="bell" class="top-bell" />-->
                        <a-icon
                            type="user"
                            class="top-user"
                            v-if="!loginUser"
                        />
                        {{ loginUser }}
                        <span class="top-login">
                            <!-- todo 1:接入用户中心 -->
                            <!-- todo 2:登陆了显示登陆人名字，否则显示登陆按钮 -->
                            <a-dropdown :trigger="['click']">
                                <a class="ant-dropdown-link" href>
                                    <!--xxx-->
                                    <a-icon type="down" />
                                </a>
                                <a-menu slot="overlay">
                                    <a-menu-item key="0">
                                        <a href="/login" v-if="!loginUser"
                                            >登陆</a
                                        >
                                        <a @click="logOut" v-else>登出</a>
                                    </a-menu-item>
                                    <a-menu-item key="1">
                                        <a href="/doc">使用手册</a>
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </span>
                    </span>
                </a-layout-header>
            </a-layout>
            <div>
                <router-view />
            </div>
        </div>
    </a-config-provider>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
    name: 'app',
    data() {
        return {
            locale: zhCN,
            defaultSelectedKeys: ['home'],
            activeHeader: '',
            activeSider: '',
            openKey: '',
            headerKey: 1
        }
    },

    computed: {
        ...mapState({
            menuList: state => state.menuList,
            siderKey: state => state.siderKey,
            loginUser: state => state.loginUser
        })
    },

    watch: {
        menuList: function(newval) {
            this.changeOpenkey(newval)
        },
        $route: function() {
            this.initMenu()
            this.headerKey += 1
        }
    },
    beforeMount() {
        this.initMenu()
    },

    methods: {
        ...mapActions([
            'setActiveHeader',
            'setActiveSider',
            'setOpenKey',
            'setSiderKey',
            'setLoginUser'
        ]),

        logOut() {
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            this.setLoginUser('')
        },

        changeOpenkey: function(val) {
            let path
            this.openKey = ''
            path = window.location.pathname.substring(1)
            val.forEach(item => {
                !item.hasOwnProperty('children')
                    ? null
                    : item.children.forEach(it => {
                          if (it.path.substring(1) === path)
                              this.openKey = item.key
                      })
            })
            this.setOpenKey(this.openKey)
        },

        //根据路由设置选中头部菜单,侧边菜单
        initMenu() {
            let paths
            if (window.location.pathname !== '/') {
                paths = window.location.pathname.substring(1).split('/')
                this.defaultSelectedKeys[0] = paths[0]
                this.activeHeader = paths[0]
                this.activeSider = paths[1]
            } else {
                this.defaultSelectedKeys[0] = 'home'
            }
            this.setActiveHeader(this.activeHeader)
            this.setActiveSider(this.activeSider)
            this.changeOpenkey(this.menuList)
            this.setSiderKey(this.siderKey + 1)
            this.setLoginUser(localStorage['userid'])
        },

        handleMenuClick(val) {
            switch (val.key) {
                case 'home':
                    this.$router.push({ path: '/' })
                    break
                case 'cicd':
                    this.$router.push({ path: '/cicd' })
                    break
                case 'apitest':
                    this.$router.push({ path: '/apitest' })
                    break
                case 'uitest':
                    this.$router.push({ path: '/uitest' })
                    break
                case 'perftest':
                    //默认转到该页第一个菜单上
                    this.$router.push({ path: '/perftest/dashboard' })
                    break
                case 'toolset':
                    this.$router.push({ path: '/toolset/testassertmanage' })
                    break
                case 'doc':
                    this.$router.push({ path: '/doc' })
                    break
                case 'login':
                    this.$router.push({ path: '/login' })
                    break
                default:
                    this.$router.push({ path: '/404' })
            }
        }
    }
}
</script>

<style lang="less" scoped>
#components-layout-demo-top-side {
    .logo {
        line-height: 50px;
        margin: auto;
        float: left;
        font-size: 25px;
    }
    .top-menu {
        line-height: 50px;
        position: absolute;
    }
    .top-right {
        line-height: 50px;
        position: absolute;
        right: 30px;
        .top-user {
            font-size: 20px;
            vertical-align: middle;
        }
        .top-login {
            font-size: 14px;
        }
    }
    
}

.header {
    background: #FFF;
    width: 100%;
    font-family: Times New Roman,Microsoft YaHei,Arial,-apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB;
}
</style>