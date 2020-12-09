<template>
     <a-layout>
        <a-layout-content style="margin: 17px 25px; height: calc(100vh - 135px)" >
           <div class="content-style">
                <h3>待开发</h3>
            </div>
        </a-layout-content>
        <my-footer />
    </a-layout>
</template>

<script>
// @ is an alias to /src
import Footer from '@/components/Footer'
export default {
    components: {
        'my-footer': Footer,
    },
    name: 'home'
}
</script>

