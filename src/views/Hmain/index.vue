<template>
    <div class="hmain">
        <ul class="list clearfix">
            <router-link to="/mult" tag="li">
                <p>时</p>
            </router-link>
            <router-link to="/amount" tag="li">
                <p>账</p>
            </router-link>
            <router-link to="/todolist" tag="li">
                <p>To</p>
            </router-link>
            <router-link to="/noval" tag="li">
                <p>Story</p>
            </router-link>
            <router-link to="/music" tag="li">
                <p>Music</p>
            </router-link>
            <router-link to="/bilibili" tag="li">
                <p>Video</p>
            </router-link>
            <router-link to="/4399" tag="li">
                <p>Game</p>
            </router-link>
        </ul>
        <Footer :list='footer'></Footer>
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
    name: 'Home',
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
.hmain {
    padding-top: 30px;
    .list {
        li {
            width: 50%;
            float: left;
            margin: 10px 0;
            p {
                padding: 8px 0;
                margin: 10px 25px;
                text-align: center;
                background: lightblue;
            }
        }
    }
}
</style>
