<template>
    <header class="header">
        <h2>{{title}}</h2>
        <div class="arrow" @click="goBack">
            <i class="el-icon-arrow-left"></i>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: ['title'],
    methods: {
        goBack () {
            this.$router.push('/home')
        }
    },
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background: lightblue;
    overflow: hidden;
    z-index: 2; 
    h2 {
        color: white;
        text-align: center;
        margin: 10px 0;
    }
    .arrow {
        position: absolute;
        top: 50%;
        left: 0;
        font-size: 27px;
        transform: translateY(-50%);
        padding: 9px;
        color: white
    }
}
</style>
