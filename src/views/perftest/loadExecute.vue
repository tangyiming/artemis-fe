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
            <div>
                <a-input v-model="testType" />
                <a-input v-model="testPlanName" />
                <a-upload :before-upload="beforeUpload" :file-list="fileList" :remove="handleRemove" accept=".jmx,.jar,.csv">
                    <a-button>
                        <a-icon type="upload" />
                        选择文件
                    </a-button>
                </a-upload>
                <a-button :disabled="fileList.length === 0" :loading="uploading" style="margin-top: 16px" type="primary" @click="handleUpload">
                    {{ uploading ? '上传中' : '确认上传' }}
                </a-button>
            </div>
        </a-layout-content>
    </div>
</template>

<script>
// import reqwest from 'reqwest'

import { save } from '@/requests/performance'

export default {
    data() {
        return {
            fileList: [],
            uploading: false,
            testType: 'load',
            testPlanName: '登录平台查询构建结果',
        }
    },
    methods: {
        handleRemove(file) {
            const index = this.fileList.indexOf(file)
            const newFileList = this.fileList.slice()
            newFileList.splice(index, 1)
            this.fileList = newFileList
        },
        beforeUpload(file) {
            this.fileList = [...this.fileList, file]
            // limit 5
            this.fileList = this.fileList.slice(-5)
            return false
        },
        handleUpload() {
            this.uploading = true
            const { fileList } = this
            const formData = new FormData()
            // FormData 多文件用一个名字循环append，无法把list对象append进FormData
            fileList.forEach((file) => {
                formData.append('file', file)
            })
            //这里包装json 后端@RequestPart可以直接转换成对象
            let info = {
                testType: this.testType,
                testPlanName: this.testPlanName,
            }
            formData.append('info', new Blob([JSON.stringify(info)], { type: 'application/json' }))
            save(formData)
                .then((res) => {
                    this.fileList = []
                    this.$message.success('文件上传成功')
                })
                .catch((err) => {
                    this.$message.error('文件上传失败')
                    console.error(err)
                })
                .finally(() => {
                    this.uploading = false
                })
        },
    },
}
</script>
