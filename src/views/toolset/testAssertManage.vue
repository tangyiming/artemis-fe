<template>
    <div class="view-box">
        <a-breadcrumb>
            <a-breadcrumb-item>
                <router-link :to="`/`">
                    <a-icon type="home" />
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item href>
                <router-link :to="`testassertmanage`">
                    <a-icon type="tool" />
                    <span>工具集</span>
                </router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <a-icon type="reconciliation" />
                <span>测试机资产管理</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content-style">
            <a-form class="ant-advanced-search-form">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="部门">
                            <a-select
                                showSearch
                                allowClear
                                :value="department"
                                :defaultActiveFirstOption="false"
                                :showArrow="false"
                                :filterOption="false"
                                @search="(val) => handleSearch('department', val)"
                                @change="(val) => handleChange('department', val)"
                            >
                                <a-select-option v-for="d in departmentList" :key="d">{{ d }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="保管人">
                            <a-select
                                showSearch
                                allowClear
                                :value="machineOwner"
                                :defaultActiveFirstOption="false"
                                :showArrow="false"
                                :filterOption="false"
                                @search="(val) => handleSearch('machineOwner', val)"
                                @change="(val) => handleChange('machineOwner', val)"
                            >
                                <a-select-option v-for="d in machineOwnerList" :key="d">{{ d }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="持有人">
                            <a-select
                                showSearch
                                allowClear
                                :value="holderName"
                                :defaultActiveFirstOption="false"
                                :showArrow="false"
                                :filterOption="false"
                                @search="(val) => handleSearch('holderName', val)"
                                @change="(val) => handleChange('holderName', val)"
                            >
                                <a-select-option v-for="d in holderNameList" :key="d">{{ d }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="设备类型">
                            <a-select
                                showSearch
                                allowClear
                                :value="equipmentType"
                                :defaultActiveFirstOption="false"
                                :showArrow="false"
                                :filterOption="false"
                                @search="(val) => handleSearch('equipmentType', val)"
                                @change="(val) => handleChange('equipmentType', val)"
                            >
                                <a-select-option v-for="d in equipmentTypeList" :key="d">{{ d }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item>
                            <a-button type="primary" @click="handleQuery">查询</a-button>
                            <a-button class="inline-second-item" @click="handleReset">重置</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div class="table">
                <a-button type="primary" icon="plus" @click="handleAddAsset">新增资产</a-button>
                <a-table :columns="columns" :dataSource="tabledata" bordered :pagination="false" style="margin-top: 6px">
                    <span slot="action" slot-scope="record" class="options">
                        <a-button type="primary" size="small" @click="handleUpdateAsset(record)">编辑</a-button>&nbsp;
                        <a-popconfirm title="确定要删除这条数据吗" @confirm="() => confirm(record)" okText="确认" cancelText="算了">
                            <a-button type="danger" size="small">删除</a-button>
                        </a-popconfirm>
                    </span>
                </a-table>
                <a-pagination
                    class="pagination-style"
                    v-model="current"
                    size="small"
                    :showTotal="(total) => `全部 ${total} 条`"
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
        <a-drawer
            title="新增测试资产"
            :width="720"
            @close="onClose"
            :visible="visible"
            :wrapStyle="{
                height: 'calc(100% - 108px)',
                overflow: 'auto',
                paddingBottom: '108px',
            }"
        >
            <a-form :form="form" layout="vertical" hideRequiredMark>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="资产编号">
                            <a-input
                                :disabled="addOrUpdateFlag === 'update'"
                                v-decorator="[
                                    'assetNum',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入资产编号',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入资产编号"
                        /></a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="所属部门">
                            <a-input
                                v-decorator="[
                                    'department',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入所属部门',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入所属部门"
                        /></a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="保管人"
                            ><a-input
                                v-decorator="[
                                    'machineOwner',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入保管人',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入保管人"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备名称"
                            ><a-input
                                v-decorator="[
                                    'productName',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入设备名称',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入设备名称"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="设备类型">
                            <a-input
                                v-decorator="[
                                    'equipmentType',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入设备类型',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入设备类型"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="设备型号">
                            <a-input
                                v-decorator="[
                                    'machineModel',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入设备型号',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入设备型号"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="设备系统">
                            <a-input
                                v-decorator="[
                                    'system',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入设备系统',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入设备系统"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="持有人">
                            <a-input
                                v-decorator="[
                                    'holderName',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入持有人',
                                            },
                                        ],
                                    },
                                ]"
                                placeholder="请输入持有人"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div
                :style="{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                }"
            >
                <a-button :style="{ marginRight: '8px' }" @click="handelDrawerCancel">取消</a-button>
                <a-button @click="handelDrawerSubmit" type="primary">提交</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import { addAsset, getAssetInfo, deleteAsset, updateAsset, queryAsset } from '@/requests/toolset'
import _ from 'lodash'
const columns = [
    {
        title: '资产编号',
        dataIndex: 'assetNum',
    },
    {
        title: '所属部门',
        dataIndex: 'department',
    },
    {
        title: '保管人',
        dataIndex: 'machineOwner',
    },

    {
        title: '设备名称',
        dataIndex: 'productName',
    },
    {
        title: '设备类型',
        dataIndex: 'equipmentType',
    },
    {
        title: '设备型号',
        dataIndex: 'machineModel',
    },
    {
        title: '设备系统',
        dataIndex: 'system',
    },
    {
        title: '持有人',
        dataIndex: 'holderName',
    },
    {
        title: '操作',
        fixed: 'right',
        width: 100,
        scopedSlots: { customRender: 'action' },
    },
]
let _this = {}
export default {
    data() {
        return {
            departmentList: [],
            department: '',
            machineOwnerList: [],
            machineOwner: '',
            holderNameList: [],
            holderName: '',
            equipmentTypeList: [],
            equipmentType: '',
            total: 0,
            current: 1,
            pageSize: 5,
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            tabledata: [],
            columns,
            form: this.$form.createForm(this),
            visible: false,
            addOrUpdateFlag: '',
            assetId: 0,
        }
    },
    mounted: function () {
        let p = { pageNum: 1, pageSize: 5 }
        getAssetInfo(p).then((res) => {
            this.tabledata = res.data.data
            this.total = res.data.total
        })
    },
    beforeCreate() {
        _this = this
    },
    methods: {
        handleSearch: _.debounce((key, val) => {
            let p = { [key]: val }
            queryAsset(p).then((res) => {
                switch (Object.keys(p)[0]) {
                    case 'department':
                        _this.departmentList = res.data
                        break
                    case 'machineOwner':
                        _this.machineOwnerList = res.data
                        break
                    case 'holderName':
                        _this.holderNameList = res.data
                        break
                    case 'equipmentType':
                        _this.equipmentTypeList = res.data
                        break
                }
            })
        }, 500),
        handleChange(key, val) {
            switch (key) {
                case 'department':
                    this.department = val
                    break
                case 'machineOwner':
                    this.machineOwner = val
                    break
                case 'holderName':
                    this.holderName = val
                    break
                case 'equipmentType':
                    this.equipmentType = val
                    break
            }
        },
        handleQuery() {
            let p = {
                pageNum: 1,
                pageSize: parseInt(this.pageSize),
                department: this.department,
                machineOwner: this.machineOwner,
                holderName: this.holderName,
                equipmentType: this.equipmentType,
            }
            getAssetInfo(p).then((res) => {
                this.tabledata = res.data.data
                this.total = res.data.total
            })
        },
        handleReset() {
            this.department = ''
            this.machineOwner = ''
            this.holderName = ''
            this.equipmentType = ''
        },
        showDrawer() {
            this.visible = true
        },
        handleAddAsset() {
            this.addOrUpdateFlag = 'add'
            this.showDrawer()
        },
        handelDrawerCancel() {
            this.visible = false
            this.form.resetFields()
        },
        handelDrawerSubmit() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (this.addOrUpdateFlag === 'add') {
                        addAsset(values).then((res) => {
                            if (res.code === '804') {
                                this.$message.warning(res.msg)
                            } else {
                                this.visible = false
                                this.form.resetFields()
                                this.current = 1
                                getAssetInfo({
                                    pageNum: parseInt(this.current),
                                    pageSize: parseInt(this.pageSize),
                                }).then((res) => {
                                    this.tabledata = res.data.data
                                    this.total = res.data.total
                                })
                            }
                        })
                    } else {
                        updateAsset({ ...values, id: this.assetId }).then((res) => {
                            if (res.code === '0') {
                                this.visible = false
                                this.form.resetFields()
                                getAssetInfo({
                                    pageNum: parseInt(this.current),
                                    pageSize: parseInt(this.pageSize),
                                }).then((res) => {
                                    this.tabledata = res.data.data
                                    this.total = res.data.total
                                })
                            } else {
                                this.$message.warning(res.msg)
                            }
                        })
                    }
                }
            })
        },
        onClose() {
            this.visible = false
        },
        handelSizeChange(current, size) {
            this.current = current
            this.pageSize = size
            let p = { pageNum: current, pageSize: size }
            getAssetInfo(p).then((res) => {
                this.tabledata = res.data.data
                this.total = res.data.total
            })
        },
        handelPageChange(page, pageSize) {
            this.current = page
            this.pageSize = pageSize
            let p = { pageNum: parseInt(page), pageSize: parseInt(pageSize) }
            getAssetInfo(p).then((res) => {
                this.tabledata = res.data.data
                this.total = res.data.total
            })
        },
        handleUpdateAsset(record) {
            let p = {
                pageNum: 1,
                pageSize: 1,
                id: record.id,
            }
            getAssetInfo(p).then((res) => {
                let data = res.data.data[0]
                //setTimeout修复antd bug：You cannot set a form field before rendering a field associated with the value.
                setTimeout(() => {
                    this.form.setFieldsValue({
                        assetNum: data.assetNum,
                        department: data.department,
                        machineOwner: data.machineOwner,
                        productName: data.productName,
                        equipmentType: data.equipmentType,
                        machineModel: data.machineModel,
                        system: data.system,
                        holderName: data.holderName,
                    })
                }, 0)
                this.showDrawer()
                this.addOrUpdateFlag = 'update'
                this.assetId = record.id
            })
        },

        confirm(val) {
            deleteAsset(val.id).then(() => {
                let p = {
                    pageNum: parseInt(this.current),
                    pageSize: parseInt(this.pageSize),
                }
                getAssetInfo(p).then((res) => {
                    this.tabledata = res.data.data
                    this.total = res.data.total
                })
            })
        },
    },
}
</script>
<style lang="less" scoped>
.options {
    display: inline-flex;
}

.pagination-style {
    margin-top: 6px;
    float: right;
}
</style>
