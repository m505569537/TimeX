<template>
    <div class="mult">
        <Header :title='title'></Header>
        <router-view></router-view>
        <Footer :list='footer'></Footer>
    </div>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
const footer = [
    {
        to:'/time',
        class: 'iconfont icon-time',
        words: 'Time',
        span: 8
    },
    {
        to:'/date',
        class: 'iconfont icon-date',
        words: 'Date',
        span: 8
    },
    {
        to:'/weather',
        class: 'iconfont icon-weather_yin',
        words: 'Weather',
        span: 8
    }
]
export default {
    name: 'Mult',
    data() {
        return {
            footer,
            title: ''
        }
    },
    components: {
        Header,
        Footer
    },
    mounted() {
        this.footer.forEach( item => {
                if(item.to === this.$route.path){
                    this.title = item.words
                }
            } )
    },
    watch: {
        '$route': function(to, from) {
            this.footer.forEach( item => {
                if(item.to === to.path){
                    this.title = item.words
                }
            } )
        }
    },
}
</script>

<style lang="scss" scoped>
.mult {
    padding-top: 48px;
    box-sizing: border-box;
    height: 100vh;
    .el-row {
        text-align: center;
        padding: 3px 0;
        p {
            margin: 6px 0;
        }
        &.router-link-active {
            background: rgb(226, 90, 113);
            color: white;
        }
    }
}
</style>
