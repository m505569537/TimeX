<template>
    <div class="register">
        <el-form :model="ruleForm" ref="ruleForm" label-width='20%'>
            <el-form-item label='账号' prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label='密码' prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label='确认密码' prop="psw">
                <el-input v-model="ruleForm.psd" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label='类型' prop="type">
                <el-radio v-model="ruleForm.type" label="customer">顾客</el-radio>
                <el-radio v-model="ruleForm.type" label="business">商家</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.prevent="submitForm">提交</el-button>
                <el-button @click="goLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:'Register',
    data() {
        return {
            ruleForm:{
                username:'',
                password: '',
                psd:'',
                type:'customer'
            }
        }
    },
    methods: {
        submitForm () {
            // console.log(this.$store.state);
            this.$store.dispatch('registerAsync',{ ...this.ruleForm })
        },
        goLogin () {
            this.$router.push('/login')
        }
    },
    mounted() {
        const { _id } = this.$store.state.user
        if(_id){
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="scss">
.register {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: lightblue;
    form {
        background: white;
        padding: 15px 5px 5px;
        margin: 5px;
        border-radius: 5px;
        .el-form-item {
            label {
                font-size: 12px
            }
        }
    }
}
</style>
