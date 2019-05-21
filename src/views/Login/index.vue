<template>
    <div class="login">
        <el-form :model="ruleForm" ref="ruleForm" label-width='20%'>
            <el-form-item label='账号' prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label='密码' prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.prevent="submitForm">确认</el-button>
                <el-button @click="goRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    name:'Login',
    data() {
        return {
            ruleForm:{
                username:'',
                password: ''
            }
        }
    },
    methods: {
        submitForm () {
            this.$store.dispatch('loginAsync',this.ruleForm)
        },
        goRegister () {
            this.$router.push('/register')
        }
    },
    mounted() {
        const userid = Cookies.get('userid')
        if(userid){
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: lightblue;
    form {
        background: white;
        padding: 15px 5px 5px;
        margin: 5px;
        border-radius: 5px
    }
}
</style>
