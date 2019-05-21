<template>
    <div>
        user
        <Footer :list="footer"></Footer>
    </div>
</template>

<script>
import Footer from '../../components/Footer'
const footer = [
    {
        to: '/hmain',
        class: 'el-icon-menu',
        words: 'Menu',
        span: 12
    },
    {
        to: '/user',
        class: 'iconfont icon-user',
        words: 'User',
        span: 12
    }
]
export default {
    name: 'User',
    data() {
        return {
            footer
        }
    },
    components: {
        Footer
    }
}
</script>

<style lang="scss" scoped>

</style>
