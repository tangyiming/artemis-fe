<template>
    <div class="view-box">
        <a-breadcrumb>
            <a-breadcrumb-item>
                <router-link :to="`/`">
                    <a-icon type="home" />
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item href>
                <router-link :to="`smscodequery`">
                    <a-icon type="tool" />
                    <span>工具集</span>
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <a-icon type="mobile" />
                <span>短信验证码查询</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content-style">
            <a-form
                :form="form"
                @submit="handleSubmit"
                layout="inline"
                class="ant-advanced-search-form"
            >
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="手机号">
                            <a-input
                                placeholder="请输入查询手机号"
                                v-decorator="[
                                    'mobile',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入手机号'
                                            }
                                        ]
                                    }
                                ]"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item>
                            <a-button type="primary" html-type="submit"
                                >查询</a-button
                            >
                            <a-button
                                class="inline-second-item"
                                @click="handleReset"
                                >重置</a-button
                            >
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <a-table
                :columns="columns"
                :dataSource="tabledata"
                :rowKey="tabledata => tabledata.id"
                bordered
                class="table"
                :pagination="false"
            />
        </a-layout-content>
    </div>
</template>
<script>
import { getSms } from '@/requests/toolset'
import ARow from 'ant-design-vue/es/grid/Row'

const columns = [
    {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '200px'
    },
    {
        title: '发送时间',
        dataIndex: 'createtime',
        key: 'createtime',
        width: '200px'
    },
    {
        title: '短信内容',
        dataIndex: 'content',
        key: 'content'
    }
]

export default {
    components: { ARow },
    data() {
        return {
            tabledata: [],
            columns,
            form: this.$form.createForm(this)
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    getSms({ phoneNum: parseInt(values.mobile) }).then(res => {
                        this.tabledata = res.data
                    })
                }
            })
        },
        handleReset() {
            this.form.resetFields()
            this.tabledata = []
        }
    }
}
</script>
