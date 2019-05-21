<template>
    <div class="collinfo">
        <nav>
            <i class="iconfont icon-fanhui" @click="goBack"></i>
            <i class="iconfont icon-qita"></i>
        </nav>
        <el-row>
            <el-col :span="4">
                <i @click="complete" :class="['iconfont', this.$route.params.completed?'icon-icons-':'icon-radio-unchecked-b-o']"></i>
            </el-col>
            <el-col :span="16"></el-col>
            <el-col :span="4">
                <i class="iconfont icon-mark"></i>
            </el-col>
        </el-row>
        <el-row>
            <textarea cols="30" rows="10" v-model="content"></textarea>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Collinfo',
    data() {
        return {
            type: '',
            content: ''
        }
    },
    methods: {
        goBack () {
            this.$router.go(-1)
            this.$store.dispatch('addCollectAsync', this.$route.params)
            let info = this.$route.params
            info.content = this.content
            if(this.type===info.completed){
                // 说明没有改变其完成状态
                this.$store.commit('modifyCol', info)
            } else {
                this.$store.commit('comCol', info)
            }
        },
        complete () {
            this.$route.params.completed = !this.$route.params.completed
        }
    },
    mounted() {
        this.type = this.$route.params.completed
        this.content = this.$route.params.content
    },
}
</script>

<style lang="scss" scoped>
.collinfo {
    nav {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        i {
            font-size: 20px;
        }
    }
    .el-row {
        margin: 0 10px;
        padding: 15px 0;
        border-bottom: 1px solid rgb(190, 186, 186);
        .el-col {
            height: 21px;
            &:last-child {
                text-align: center
            }
            i {
                font-size: 18px;
            }
        }
    }
}
</style>
