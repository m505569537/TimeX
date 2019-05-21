<template>
    <div class="collection">
        <div class="incomplete">
            <el-row v-for="item in this.$store.state.collection.incomplete" :key="item._id">
                <el-col :span="6">
                    <i @click="complete(item)" :class="['iconfont', item.completed?'icon-icons-':'icon-radio-unchecked-b-o']"></i>
                </el-col>
                <el-col :span="18"><div @click="toDetail(item)">{{item.content}}</div></el-col>
            </el-row>
        </div>
        <div class="completed" v-show="this.$store.state.collection.completed.length===0?false:true">
            <p class="title">已完成</p>
            <el-row v-for="item in this.$store.state.collection.completed" :key="item._id">
                <el-col :span="6">
                    <i @click="complete(item)" :class="['iconfont', item.completed?'icon-icons-':'icon-radio-unchecked-b-o']"></i>
                </el-col>
                <el-col :span="18"><div @click="toDetail(item)">{{item.content}}</div></el-col>
            </el-row>
        </div>
        <div class="add" @click="toggle">
            <i class="el-icon-plus"></i>
        </div>
        <div v-show="flag" class="addform" @click.self="toggle">
            <div class="coll-container">
                <input type="text" autofocus v-model="value">
                <el-row>
                    <el-col :span="6">
                        <i class="el-icon-date"></i>
                    </el-col>
                    <el-col :span="6">
                        <i class="el-icon-star-on"></i>
                    </el-col>
                    <el-col :span="6">
                        <i class="el-icon-time"></i>
                    </el-col>
                    <el-col :span="6">
                        <i class="iconfont icon-send" @click.self="addinfo"></i>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import  Cookies from 'js-cookie'
export default {
    name: 'Collections',
    data() {
        return {
            value: '',
            flag: false
        }
    },
    methods: {
        toggle () {
            this.flag = !this.flag
        },
        addinfo () {
            if(this.value.trim()===''){
                return;
            }
            const userid = Cookies.get('userid')
            const info = {
                userid: userid.substring(3,userid.length-1),
                content: this.value,
                completed: false
            }
            this.$store.dispatch('addCollectAsync', info)
            this.value = ''
            this.toggle()
        },
        complete (info) {
            info.completed = !info.completed
            this.$store.dispatch('addCollectAsync', info)
            this.$store.commit('comCol', info)
            // console.log(info);
        },
        toDetail (info) {
            this.$router.push({
                name: 'Collinfo',
                params: info
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.collection { 
    .incomplete, .completed {
        & > .el-row {
            .el-col {
                padding-top:16px;
                font-size: 17px;
            }
            .el-col-6 {
                text-align: center;
                i {
                    font-size: 18px;
                    vertical-align: middle
                }
            }
            .el-col-18 {
                letter-spacing: 1px;
                div {
                    height: 23px;
                }
            }
        }
    }
    .completed {
        padding-bottom: 20px;
        p {
            margin-bottom: 0;
            padding: 4px 20px;
            background: lightblue;
            font-size: 13px;
            letter-spacing: 1px;
            color: grey
        }
        & > .el-row {
            color: grey
        }
    }
    .add {
        position: fixed;
        bottom: 75px;
        right: 20px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        background: rgb(73, 73, 187);
        color: white;
        font-size: 25px;
    }
    .addform {
        background: rgba(0,0,0,.3);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        .coll-container {
            position: absolute;
            bottom: 0;  
            width: 100%;
            background: white;
            border-radius: 8px 8px 0 0;
            box-sizing: border-box;
            padding: 5px;
            input {
                border:0;
                outline: none;
                height: 40px;
                text-indent: 10px;
                font-size: 18px;
                letter-spacing: 1px;
            }
            .el-row {
                .el-col{
                    text-align: center;
                    padding: 5px;
                    &:last-child {
                        text-align: right;
                    }
                    i {
                        font-size: 25px;
                    }
                }
            }
        }
    }
}
</style>
