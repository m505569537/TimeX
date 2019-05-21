<template>
    <div class="footer">
        <el-row>
            <el-col v-for="item in list" :span="item.span" :key="item.to">
                <router-link class="tab" tag="div" :to="item.to">
                    <i :class="item.class"></i>
                    <p>{{item.words}}</p>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['list']
}
</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 0 10px 7px rgba(0,0,0,.3);
    background: white;
    .el-row {
        text-align: center;
        p {
            margin: 0;
        }
        .tab {
            padding: 6px 0;
        }
        .router-link-active {
            background: rgb(226, 90, 113);
            color: white;
        }
    }
}
</style>
