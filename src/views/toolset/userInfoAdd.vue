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
                <a-icon type="usergroup-add" />
                <span>测试用户构造</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content-style">
            <a-form
                :form="form"
                @submit="handleSubmit"
                class="ant-advanced-search-form"
            >
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="所属BU">
                            <a-select v-model="bu">
                                <a-select-option value="1对1"
                                    >1对1
                                </a-select-option>
                                <a-select-option value="少儿"
                                    >少儿
                                </a-select-option>
                                <a-select-option value="陪练"
                                    >陪练
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="是否付费">
                            <a-select v-model="isPayMoney">
                                <a-select-option value="true"
                                    >付费
                                </a-select-option>
                                <a-select-option value="false"
                                    >未付费
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6" v-if="isPayMoney !== 'false'">
                        <a-form-item label="课时">
                            <a-input
                                placeholder="请输入课时数量"
                                v-decorator="[
                                    'lessonPeriod',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    '课时数量必填且为正整数'
                                            }
                                        ]
                                    }
                                ]"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="数量">
                            <a-input
                                placeholder="请输入需生成用户数量"
                                v-decorator="[
                                    'number',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    '用户数量必填且为正整数'
                                            }
                                        ]
                                    }
                                ]"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item>
                            <a-button html-type="submit" type="primary"
                                >一键生成
                            </a-button>
                            <a-button
                                @click="handleReset"
                                class="inline-second-item"
                                >重置
                            </a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <div class="table">
                <a-button type="primary" icon="download" @click="exportTable"
                    >导出</a-button
                >
                <a-spin :spinning="spinning">
                    <a-table
                        :columns="columns"
                        :dataSource="tabledata"
                        :pagination="false"
                        style="margin-top:6px"
                        id="exportTable"
                        bordered
                        ><span slot="isPayMoney" slot-scope="text, record">{{
                            record.isPayMoney === 'true' ? '付费' : '未付费'
                        }}</span>
                        <span slot="lessonPeriod" slot-scope="text, record"
                            >{{
                                !!record.lessonPeriod
                                    ? record.lessonPeriod
                                    : '--'
                            }}
                        </span>
                    </a-table>
                </a-spin>
            </div>
        </a-layout-content>
    </div>
</template>
<script>
import { mockData } from '@/requests/toolset'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const columns = [
    {
        title: '所属BU',
        dataIndex: 'bu',
        key: 'bu'
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile'
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '是否付费',
        dataIndex: 'isPayMoney',
        key: 'isPayMoney',
        scopedSlots: { customRender: 'isPayMoney' }
    },
    {
        title: '课时数',
        dataIndex: 'lessonPeriod',
        key: 'lessonPeriod',
        scopedSlots: { customRender: 'lessonPeriod' }
    },
    {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade'
    }
]
const tabledata = []
export default {
    data() {
        return {
            form: this.$form.createForm(this),
            bu: '1对1',
            isPayMoney: 'false',
            spinning: false,
            tabledata,
            columns
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    let p = {
                        bu: this.bu,
                        isPayMoney: this.isPayMoney,
                        lessonPeriod: values.lessonPeriod,
                        number: values.number
                    }
                    this.spinning = true
                    mockData(p).then(res => {
                        if (res.code === '0' && res.data[0] != null) {
                            let temp = res.data
                            temp.forEach(it => {
                                it.isPayMoney = '' + it.isPayMoney
                            })
                            this.tabledata = JSON.parse(JSON.stringify(temp))
                            this.spinning = false
                        } else {
                            this.$message.error('数据创建失败')
                            this.tabledata = []
                            this.spinning = false
                        }
                    })
                }
            })
        },
        handleReset() {
            this.form.resetFields()
            this.bu = '1对1'
            this.isPayMoney = 'false'
            this.tabledata = []
        },
        exportTable() {
            const wb = XLSX.utils.table_to_book(
                document.querySelector('#exportTable')
            )
            const wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            })
            try {
                FileSaver.saveAs(
                    new Blob([wbout], { type: 'application/octet-stream' }),
                    '构造用户信息.xlsx'
                )
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout)
            }
            return wbout
        }
    }
}
</script>
