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
                <a-icon type="user" />
                <span>用户信息查询</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content-style">
            <a-form :form="form" class="ant-advanced-search-form">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="所属BU">
                            <a-select defaultValue="null" v-model="bu">
                                <a-select-option value=""
                                    >请选择</a-select-option
                                >
                                <a-select-option value="1"
                                    >1对1</a-select-option
                                >
                                <a-select-option value="2"
                                    >少儿</a-select-option
                                >
                                <a-select-option value="3"
                                    >陪练</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="是否付费">
                            <a-select defaultValue="null" v-model="isPayMoney">
                                <a-select-option value=""
                                    >请选择</a-select-option
                                >
                                <a-select-option value="1"
                                    >付费</a-select-option
                                >
                                <a-select-option value="0"
                                    >未付费</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                    </a-col>

                    <a-col :span="6">
                        <a-form-item label="手机号">
                            <a-input
                                placeholder="请输入查询手机号"
                                v-model="mobile"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="10">
                        <a-form-item label="注册时间">
                            <a-range-picker
                                v-model="dateRange"
                                :format="dateFormat"
                                showTime
                            ></a-range-picker>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="8">
                        <a-form-item>
                            <a-button type="primary" @click="handleQuery"
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
            <div class="table">
                <a-table
                    :columns="columns"
                    :dataSource="tabledata"
                    bordered
                    :pagination="false"
                    style="margin-top:6px"
                />
                <a-pagination
                    class="pagination-style"
                    v-model="current"
                    size="small"
                    :showTotal="total => `全部 ${total} 条`"
                    :defaultPageSize="5"
                    :total="total"
                    :pageSizeOptions="pageSizeOptions"
                    @change="handelPageChange"
                    @showSizeChange="handelSizeChange"
                    showSizeChanger
                    hideOnSinglePage
                />
            </div>
        </a-layout-content>
    </div>
</template>
<script>
const columns = [
    {
        title: '所属BU',
        dataIndex: 'bu',
        key: 'bu',
        width: '10%'
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
        width: '15%'
    },
    {
        title: '用户名',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '15%'
    },
    {
        title: '是否付费',
        dataIndex: 'isPayMoney',
        key: 'isPayMoney',
        width: '10%'
    },
    {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        width: '10%'
    },
    {
        title: '课时',
        dataIndex: 'hours',
        key: 'hours',
        width: '10%'
    },

    {
        title: '课时包ID',
        dataIndex: 'hourPkgId',
        key: 'hourPkgId',
        width: '10%'
    }
]
import { queryUser } from '@/requests/toolset'
import moment from 'moment'
const tabledata = []
export default {
    data() {
        return {
            bu: '',
            isPayMoney: '',
            mobile: '',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            dateRange: [],
            total: 0,
            current: 1,
            pageSize: 5,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            tabledata: [],
            columns,
            form: this.$form.createForm(this)
        }
    },
    methods: {
        handleQuery() {
            let p = {
                pageNum: this.current,
                pageSize: parseInt(this.pageSize),
                bu: this.bu,
                isPayMoney: this.isPayMoney,
                mobile: this.mobile,
                beginDate:
                    this.dateRange.length > 0
                        ? moment(this.dateRange[0]).format(this.dateFormat)
                        : '',
                endDate:
                    this.dateRange.length > 0
                        ? moment(this.dateRange[1]).format(this.dateFormat)
                        : ''
            }
            queryUser(p).then(res => {
                this.tabledata = res.data.data
                this.total = res.data.total
            })
        },
        handleReset() {
            this.bu = ''
            this.isPayMoney = ''
            this.mobile = ''
            this.dateRange = []
        },
        handelSizeChange(current, size) {
            this.current = current
            this.pageSize = size
            let p = { pageNum: current, pageSize: size }
            queryUser(p).then(res => {
                this.tabledata = res.data.data
                this.total = res.data.total
            })
        },
        handelPageChange(page, pageSize) {
            this.current = page
            this.pageSize = pageSize
            let p = { pageNum: parseInt(page), pageSize: parseInt(pageSize) }
            queryUser(p).then(res => {
                this.tabledata = res.data.data
                this.total = res.data.total
            })
        }
    }
}
</script>

<style lang="less" scoped>
.pagination-style {
    margin-top: 6px;
    float: right;
}
</style>
