<template>
    <div class="todolist">
        <Header :title="title"></Header>
        <router-view></router-view>
        <Footer :list="footer"></Footer>
    </div>
</template>

<script>
import  Cookies from 'js-cookie'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
const footer = [
    {
        to:'/collections',
        class: 'iconfont icon-checkboxchecked',
        words: 'Collect',
        span: 8
    },
    {
        to:'/potato',
        class: 'iconfont icon-clock',
        words: 'Potato',
        span: 8
    },
    {
        to:'/plugin',
        class: 'iconfont icon-plugin',
        words: 'Plugin',
        span: 8
    }
]
export default {
    name: 'Todolist',
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
        let userid = Cookies.get('userid')
        userid = userid.substring(3,userid.length-1)
        this.footer.forEach( item => {
            if(item.to === this.$route.path){
                this.title = item.words
            }
        } )
        this.$store.dispatch('getCollectAsync',{
            userid
        })
    },
    watch: {
        '$route': function(to, from) {
            this.footer.forEach( item => {
                if(item.to === to.path){
                    this.title = item.words
                }
            } )
        }
    }
}
</script>

<style lang="scss" scoped>
.todolist {
    padding: 48px 0;
}
</style>
