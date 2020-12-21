<template>
    <div class="view-box">
        <a-breadcrumb>
            <a-breadcrumb-item>
                <router-link :to="`/`">
                    <a-icon type="home" />
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item href>
                <router-link :to="`dashboard`">
                    <a-icon type="medicine-box" />
                    <span>性能测试</span>
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <a-icon type="thunderbolt" />
                <span>测试执行</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content-style">
            <div style="width: 400px; margin: auto">
                <a-input v-model="url" placeholder="测试链接">
                    <a-select slot="addonBefore" v-model="prefixValue" style="width: 90px">
                        <a-select-option value="http://"> http:// </a-select-option>
                        <a-select-option value="https://"> https:// </a-select-option>
                    </a-select>
                </a-input>
                <a-button type="primary" @click="execute"> 测试执行 </a-button>
                <a-button :loading="loading">{{ status }}</a-button>
                <a-button :disabled="disable" @click="report"> 查看测试报告 </a-button>
            </div>
        </a-layout-content>
    </div>
</template>

<script>
import { build, result } from '@/requests/jenkins'

export default {
    data() {
        return {
            status: '测试状态',
            url: '',
            prefixValue: 'http://',
            buildNum: 0,
            disable: true,
            loading: false,
        }
    },
    methods: {
        execute() {
            let url = this.prefixValue + this.url
            let p = { jobName: 'sitespeed-test', params: { url: url } }
            build(p).then(res => {
                res.succ === true ? (this.status = '测试触发成功') : (this.status = '测试触发失败')
                this.buildNum = res.data.buildNumber
                this.loading = true
                this.result()
            })
        },

        // setTimeout递归函数,以及条件结束递归
        result() {
            result({ jobName: 'sitespeed-test', buildNum: this.buildNum }).then(res => {
                if (res.succ === true) {
                    if (res.data.buildResult === null) {
                        this.status = 'WAIT...'
                    } else {
                        this.status = res.data.buildResult
                        if (res.data.buildResult === 'SUCCESS') this.disable = false
                        this.loading = false
                    }
                }
            })
            if (this.status !== 'WAIT...' && this.status !== '测试状态' && this.status !== '测试触发成功' && this.status !== '测试触发失败') {
                clearTimeout(this.timer)
            } else {
                this.timer = setTimeout(() => {
                    this.result()
                }, 3000)
            }
        },

        report() {
            window.open(`/sitespeed-result/sitespeed-test/${this.buildNum}/`, '_blank')
        },
    },
}
</script>
<style scoped type="less">
.login-form {
    position: relative;
    text-align: center;
    vertical-align: middle;
    top: 100px;
}
</style>
