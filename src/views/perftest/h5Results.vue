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
                <a-icon type="ordered-list" />
                <span>测试列表</span>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content class="content-style"> </a-layout-content>
    </div>
</template>

<script>
export default {
    name: 'h5Results',
}
</script>
