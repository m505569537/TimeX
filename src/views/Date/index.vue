<template>
    <div class="date">
        <div class="year">
            <div class="pre" @click="pre">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="year-con">
                <p>{{ year }}</p>
                <p>{{ month[monInd] }}</p>
            </div>
            <div class="next" @click="next">
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="blender">
            <ul class="week clearfix">
                <li class="day" v-for="item in weeklist" :key="item">
                    {{item | dayFormat}}
                </li>
            </ul>
            <ul class="days clearfix">
                <li class="day" v-for="item in daylist" :key="item">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Date',
    data() {
        return {
            daylist: [],
            weeklist: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            year: '',
            month: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            monInd: 0
        }
    },
    methods: {
        pre () {
            this.daylist = []
            this.monInd--
            if(this.monInd<0){
                this.year--
                this.monInd = 11
            }
            var dayNum = new Date(this.year, this.monInd+1, 0).getDate()
            var i = 0
            while (i < dayNum) {
                this.daylist.push(++i)
            }
            var day1 = new Date(this.year,this.monInd,1).getDay()
            const days = document.querySelectorAll('.date > .blender > .days > .day')
            days[0].style.marginLeft = days[0].clientWidth * day1 + 'px'
        },
        next () {
            this.daylist = []
            this.monInd++
            if(this.monInd>11){
                this.year++
                this.monInd = 0
            }
            var dayNum = new Date(this.year, this.monInd+1, 0).getDate()
            var i = 0
            while (i < dayNum) {
                this.daylist.push(++i)
            }
            var day1 = new Date(this.year,this.monInd,1).getDay()
            const days = document.querySelectorAll('.date > .blender > .days > .day')
            days[0].style.marginLeft = days[0].clientWidth * day1 + 'px'
        }
    },
    created() {
        var now = new Date()
        this.year = now.getFullYear()
        this.monInd = now.getMonth()
        //获得本月天数
        var dayNum = new Date(now.getFullYear(),now.getMonth()+1,0).getDate()
        // console.log(dayNum);
        var i = 0
        while (i < dayNum) {
            this.daylist.push(++i)
        }
    },
    mounted() {
        const days = document.querySelectorAll('.date > .blender > .days > .day')
        var now = new Date()
        var day1 = new Date(now.getFullYear(),now.getMonth(),1).getDay()
        var date = now.getDate()
        days[0].style.marginLeft = days[0].clientWidth * day1 + 'px'
        days[date-1].style.background = '#1abc9c'
    },
    filters: {
        dayFormat (day) {
            return day.substring(0,2)
        }
    }
}
</script>

<style lang="scss" scoped>
.date {
    .year {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1ABC9C;
        color: white;
        padding: 10px 0;
        .year-con {
            p {
                margin: 6px 0;
                text-align: center;
                &:nth-child(1) {
                    font-size: 22px;
                }
            }
        }
        .pre, .next {
            padding: 0 10px;
            font-size: 20px;
        }
    }
    .blender {
        .week {
            background: #DDDDDD;
        }
        .day {
            float: left;
            text-align: center;
            width: 14.2%;
            padding: 5px 0;
            color: #666666;
        }
        .days > .day {
            color: #777777;
            padding: 15px 0;
            border-radius: 50%;
        }
    }
}
</style>
