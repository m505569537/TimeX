<template>
    <div class="account">
        <Header title="account"></Header>
        <Addacc v-if="flag" @toggle="toggle" :row='row' :typeT='type'></Addacc>
        <div class="calc">
            <div class="in-out">
                <div class="in" @click="show">
                    <p>收入</p>
                    <p>￥{{this.$store.state.account.income}}</p>
                </div>
                <div class="out" @click="show">
                    <p>支出</p>
                    <p>￥{{this.$store.state.account.expenditure}}</p>
                </div>
            </div>
            <p class="total" style="text-align: center">
                <span>总计</span>
                <span>￥{{this.$store.state.account.income + this.$store.state.account.expenditure}}</span>
            </p>
        </div>
        <div class="radios">
            <el-radio v-model="type" label="0">All</el-radio>
            <el-radio v-model="type" label="1">In</el-radio>
            <el-radio v-model="type" label="2">Out</el-radio>
        </div>
        <el-table
            :data="this.$store.state.account.list"
            stripe
            style="width:100vw"
            height="300"
        >
            <el-table-column label="日期" width="60" align="center">
                <template slot-scope="scope">
                    {{scope.row.date}}
                </template>
            </el-table-column>
            <el-table-column label="原因" width="65" align="center">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column label="价格" width="50" align="center">
                <template slot-scope="scope">
                    {{scope.row.money}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="modify(scope)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="delRecord(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import  Cookies from 'js-cookie'
import { MessageBox } from 'mint-ui';
import Header from '../../components/Header'
import Addacc from './Addacc'
export default {
    name: 'Account',
    data() {
        return {
            flag: false,
            type: '0',
            row: {}
        }
    },
    components: {
        Header,
        Addacc
    },
    methods: {
        toggle () {
            this.flag = !this.flag
        },
        show () {
            this.row = {}
            this.toggle()
        },
        modify (scope) {
            // console.log(scope);
            this.row = scope.row
            this.toggle()
        },
        delRecord (scope) {
            this.$store.dispatch('delAccountAsync', {
                _id: scope.row._id
            })
            this.reqAcc(this.type)
        },
        reqAcc (type) {
            let userid = Cookies.get('userid')
            userid = userid.substring(3,userid.length-1)
            if(type === '0') {
                this.$store.dispatch('reqAccountAsync', {
                    userid
                })
            } else if(type==='1'){
                this.$store.dispatch('reqAccountAsync', {
                    userid,
                    type:'0'
                })
            } else {
                this.$store.dispatch('reqAccountAsync', {
                    userid,
                    type:'1'
                })
            }
        }
    },
    watch: {
        'type': function () {
            this.reqAcc(this.type)
        }
    },
    mounted() {
        let userid = Cookies.get('userid')
        userid = userid.substring(3,userid.length-1)
        this.$store.dispatch('reqAccountAsync', {
            userid
        })      
        // this.$store.commit('inAndOut')
    },
}
</script>

<style lang="scss">
.account {
    padding-top: 48px;
    .calc {
        .in-out {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            .in,.out {
                position: relative;
                padding: 5px 35px;
                background: rgb(214, 134, 134);
                color: white;
                text-align: center;
            }
        }
    }
    .radios {
        display: flex;
        justify-content: space-around
    }
}
</style>
