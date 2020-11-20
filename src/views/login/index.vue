<template>
    <a-form
        :form="form"
        class="login-form"
        layout="inline"
        @submit="handleSubmit"
    >
        <a-form-item
            :help="userIdError() || ''"
            :validate-status="userIdError() ? 'error' : ''"
        >
            <a-input
                v-decorator="[
                    'userid',
                    { rules: [{ required: true, message: '请输入你的账号!' }] }
                ]"
                placeholder="userid"
            >
                <a-icon
                    slot="prefix"
                    style="color:rgba(0,0,0,.25)"
                    type="user"
                />
            </a-input>
        </a-form-item>

        <a-form-item
            :help="passwordError() || ''"
            :validate-status="passwordError() ? 'error' : ''"
        >
            <a-input
                v-decorator="[
                    'password',
                    { rules: [{ required: true, message: '请输入你的密码!' }] }
                ]"
                placeholder="Password"
                type="password"
            >
                <a-icon
                    slot="prefix"
                    style="color:rgba(0,0,0,.25)"
                    type="lock"
                />
            </a-input>
        </a-form-item>
        <a-form-item>
            <a-button
                :disabled="hasErrors(form.getFieldsError())"
                html-type="submit"
                type="primary"
            >
                登录
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
import { login } from '@/requests/user'
import { mapState, mapActions } from 'vuex'
import router from '@/router'
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

export default {
    data() {
        return {
            hasErrors,
            form: this.$form.createForm(this, { name: 'horizontal_login' })
        }
    },

    mounted() {
        this.$nextTick(() => {
            // To disabled submit button at the beginning.
            this.form.validateFields()
        })
    },
    methods: {
        ...mapActions(['setLoginUser']),
        // Only show error after a field is touched.
        userIdError() {
            const { getFieldError, isFieldTouched } = this.form
            return isFieldTouched('userid') && getFieldError('userid')
        },
        // Only show error after a field is touched.
        passwordError() {
            const { getFieldError, isFieldTouched } = this.form
            return isFieldTouched('password') && getFieldError('password')
        },
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    login(values).then(res => {
                        if (res.success) {
                            localStorage['token'] = JSON.stringify(res.data)
                            let userid = values['userid']
                            localStorage['userid'] = userid
                            this.setLoginUser(userid)
                            router.push('/')
                        } else {
                            this.$message.warn(res.msg)
                        }
                    })
                }
            })
        }
    }
}
</script>
import { mapActions, mapState } from 'vuex'
<style type="less" scoped>
.login-form {
    position: relative;
    text-align: center;
    vertical-align: middle;
    top: 100px;
}
</style>
