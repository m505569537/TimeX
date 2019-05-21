<template>
    <div class="cities" @click.self='close'>
        <div class="city-container">
            <header>
                <div class="p">
                    {{ path | pathFormat }}
                    <i class="el-icon-arrow-left" @click='back'></i>
                    <i class="iconfont icon-search" @click='showInp'></i>
                    <div class="search" ref="search">
                        <input type="text" v-model="key">
                        <i class="iconfont icon-next" @click="hideInp"></i>
                    </div>
                </div>
            </header>
            <ul class="list clearfix">
                <li v-for="item in lists" :key="item" @click='pushPath(item)'>
                    <span>{{item}}</span>
                </li>
            </ul>
            <div class="sure">
                <el-button type="primary" size="small" @click="getWeather">确认<i class="el-icon-caret-right"></i></el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { reqXml } from '../../api'
export default {
    name: 'City',
    data() {
        return {
            citytree: {},
            lists:[],
            province: [],
            cities: [],
            counties: [],
            location: {},
            path:[],
            cityId:'',
            key:''
        }
    },
    methods: {
        close () {
            this.$emit('toggle')
        },
        pushPath (name) {
            const province = this.path[0]
            const city = this.path[1]
            if(this.path.length===0){
                if(typeof this.citytree[name] === 'object'){
                    this.path.push(name)
                    // console.log(Object.keys(this.citytree[name]));
                    this.lists = this.cities = Object.keys(this.citytree[name])
                } else {
                    this.cityId = this.citytree[name]
                }
            } else if(this.path.length===1) {
                if(typeof this.citytree[province][name] === 'object'){
                    this.path.push(name)
                    this.lists = this.counties = Object.keys(this.citytree[province][name])
                } else {
                    this.cityId = this.citytree[province][name]
                }
            } else if(this.path.length===2){
                this.path.push(name)
                this.cityId = this.citytree[province][city][name]
            } else {
                this.path.pop()
                this.path.push(name)
                this.cityId = this.citytree[province][city][name]
            }
            this.key = ''
        },
        back() {
            if(this.path.length===3||this.path.length===2){
              this.path = this.path.slice(0,1)
              this.lists = this.cities
            } else if(this.path.length===1){
                this.path.pop()
                this.lists = this.province
            }
            this.cityId = ''
        },
        getWeather () {
            this.$store.dispatch('getWeatherAsync',{
                cityId: this.cityId
            })
            this.$emit('toggle')
        },
        hideInp () {
            this.$refs.search.style.right = '-80vw'
            this.$refs.search.style.opacity = '0'
        },
        showInp () {
            this.$refs.search.style.right = '0px'
            this.$refs.search.style.opacity = '1'
        }
    },
    filters: {
        pathFormat (path) {
            return '/' + path.join('/')
        }
    },
    async created() {
        const res = await reqXml()
        // console.log(res.data);
        var jsonObj = this.$x2js.xml2js(res.data)
        // console.log(jsonObj.Workbook.Worksheet.Table.Row);
        var list = jsonObj.Workbook.Worksheet.Table.Row
        list.shift()
        var str = ''
        // console.log(this.cityList[0].Cell[0].Data.__text);
        /* for(var i = 0; i < list.length; i++){
            // console.log(str.indexOf(list[i].Cell[1].Data.__text));
            if(str.indexOf(list[i].Cell[1].Data.__text) === -1){
                const province = list[i].Cell[1].Data.__text
                str += province
                this.citytree[province] = {}
                for(var j = 0; j < list.length; j++) {
                    if(list[j].Cell[1].Data.__text === province){
                        const city = list[j].Cell[2].Data.__text
                        this.citytree[province][city] = {}
                        for(var k = 0; k < list.length; k++) {
                            if(list[k].Cell[1].Data.__text===province&&list[k].Cell[2].Data.__text===city){
                                const county = list[k].Cell[3].Data.__text
                                const cityId = list[k].Cell[0].Data.__text
                                this.citytree[province][city][county] = cityId
                            }
                        }
                    }
                }
            }
        } */
        for(var i = 0; i < list.length; i++){
            const obj = list[i].Cell
            // console.log(obj);
            let cityId = obj[0].Data.__text
            let province = obj[1].Data.__text
            // console.log(province, city, county, cityId);
            if(!this.citytree[province]){
                this.citytree[province] = {}
            }
            if(obj[2]){
                let city = obj[2].Data.__text
                if(!this.citytree[province][city]){
                    this.citytree[province][city] = {}
                }
                if(obj[3]){
                    let county = obj[3].Data.__text
                    this.citytree[province][city][county] = cityId
                } else {
                    this.citytree[province][city] = cityId
                }
            } else {
                this.citytree[province] = cityId
            }
        }
        this.lists = this.province = Object.keys(this.citytree)
        // console.log(this.citytree);
        // console.log(str);
    },
    /* mounted() {
        const container = document.querySelector('.cities > .city-container')
        const header = document.querySelector('.cities > .city-container > header > .p')
        const show = document.querySelectorAll('.cities > .city-container > header > .p > i')[1]
        const search = document.querySelector('.cities > .city-container > header > .p > .search')
        container.addEventListener('click', function (e) {
            e = e||event
            // console.log(e.target,header);
            if(e.target===show){
                return;
            }
            if (e.target!==header) {
                search.style.right = '-80vw'
                search.style.opacity = '0'
                if(e.preventDefault){
                    e.preventDefault()
                }
            }
        })
    }, */
    watch: {
        'key': function () {
            // console.log(this.key);
            this.lists = []
            let patt = new RegExp(this.key,'g')
            // console.log(patt);
            if(this.path.length===0) {
                for(var i = 0; i < this.province.length; i++) {
                    if(this.province[i].match(patt)){
                        this.lists.push(this.province[i])
                    }
                }
            } else if(this.path.length===1){
                for(var i = 0; i < this.cities.length; i++) {
                    if(this.cities[i].match(patt)){
                        this.lists.push(this.cities[i])
                    }
                }
            } else if(this.path.length===2){
                for(var i = 0; i < this.counties.length; i++) {
                    if(this.counties[i].match(patt)){
                        this.lists.push(this.counties[i])
                    }
                }
            }
            // console.log(this.lists);
        }
    },
}
</script>

<style lang="scss" scoped>
.cities {
    width: 100vw;
    height: 100vh;
    // background: rgba(0,0,0,.8);
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    .city-container {
        width: 80vw;
        height: 80vh;
        background: white;
        border-radius: 4px;
        overflow-y: hidden;
        box-shadow: 0 0 5px 2px rgb(131, 127, 127);
        header {
            height: 10%;
            .p {
                margin: 0;
                position: relative;
                padding: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-indent: 10%;
                height: 21px;
                line-height: 21px;
                i {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 3px;
                    border-radius: 50%;
                    color: white;
                    text-indent: 0;
                    &.el-icon-arrow-left {
                        left: 10px;
                        background: #CDAD00;
                    }
                    &:nth-child(2) {
                        right: 10px;
                        background: red;
                        line-height: normal;
                    }
                }
                .search {
                    background: white;
                    position: absolute;
                    top: 50%;
                    right:-80vw;
                    opacity: 0;
                    transform: translateY(-50%);
                    height: 41px;
                    line-height: 41px;
                    width: 100%;
                    text-indent: 0;
                    text-align: left;
                    transition: all .7s linear;
                    input {
                        height: 20px;
                        width: 80%;
                        outline: none;
                        margin-left: 10px;
                        border: 1px solid red;
                        border-radius: 15px;
                        text-indent: 15px;
                    }
                    i {
                        width: 18px;
                        height: 18px;
                        text-align: center
                    }
                }
            }
        }
        .list {
            height: 80%;
            overflow-y: scroll;
            li {
                width: 25%;
                float:left;
                box-sizing: border-box;
                padding: 3px 5px;
                span {
                    display: block;
                    font-size: 12px;
                    text-align: center;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    background: grey;
                    color: cornsilk;
                    border-radius: 3px;
                    padding: 3px 2px;
                }
            }
        }
        .sure {
            margin:5px;
            text-align: right;
            i {
                transform: translateX(10px)
            }
        }
    }
}
</style>
