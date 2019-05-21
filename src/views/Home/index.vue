<template>
    <div class="home">
        <router-view></router-view>
    </div>
</template>

<script>
import  Cookies from 'js-cookie'
export default {
    name: 'Home',
    data() {
        return {
            
        }
    },
    mounted() {
        const { _id } = this.$store.state.user
        if(!_id) {
            let userid = Cookies.get('userid')
            if(!userid){
                this.$router.push('/login')
            } else {
                // console.log(1);
                userid = userid.substring(3,userid.length-1)
                this.$store.dispatch('autoLoginAsync', {
                    userid
                })
                this.$store.dispatch('getWeatherAsync',{
                    cityId: '1185'
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
