<template>
    <div class="addbox">
        <el-form :model="record">
            <el-form-item label="价格">
                <el-input v-model="record.money"></el-input>
            </el-form-item>
            <el-form-item label="原因">
                <el-input v-model="record.title"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio v-model="record.type" label="0">收入</el-radio>
                <el-radio v-model="record.type" label="1">支出</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addRecord">提交</el-button>
                <el-button @click="$emit('toggle')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import  Cookies from 'js-cookie'
export default {
    name: 'Addacc',
    data() {
        return {
            record: {
                money: this.row.money || '',
                title: this.row.title || '',
                type: this.row.type || '0'
            }
        }
    },
    props: [
        'row',
        'typeT'
    ],
    methods: {
        addRecord () {
            if(isNaN(this.record.money)||this.record.money.trim()===''){
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: '<strong>格式不正确</strong>',
                    type:'error',
                    duration: 1000,
                    center: true
                });
                return;
            }
            if(this.record.type==='0'&&parseInt(this.record.money)<0||this.record.type==='1'&&parseInt(this.record.money)>0){
                this.record.money = - parseInt(this.record.money) + ""
            }
            const userid = Cookies.get('userid')
            let data = Object.assign(this.record, {userid: userid.substring(3,userid.length-1)}, {date: new Date().toJSON().substring(5,10)})
            if(this.row._id) {
                data = Object.assign(data, {_id: this.row._id})
            }
            // console.log(data);
            this.$store.dispatch('addAccountAsync',data)
            if(this.row._id){
                if(this.typeT === '0') {
                    this.$store.dispatch('reqAccountAsync', {
                        userid: userid.substring(3,userid.length-1),
                    })
                } else if(this.typeT==='1'){
                    this.$store.dispatch('reqAccountAsync', {
                        userid: userid.substring(3,userid.length-1),
                        type:'0'
                    })
                } else {
                    this.$store.dispatch('reqAccountAsync', {
                        userid: userid.substring(3,userid.length-1),
                        type:'1'
                    })
                }
            }
            this.$emit('toggle')
        }
    }
}
</script>

<style lang="scss" scoped>
.addbox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 335px;
    border-radius: 5px;
    box-shadow: 0 0 3px 3px #777;
    background: white;
    z-index: 2;
    padding: 15px;
}
</style>
