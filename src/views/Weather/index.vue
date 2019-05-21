<template>
    <div class="weather">
        <div class="nowtem">
            <p class="large">{{ this.$store.state.weather.forecast[0].tempDay + '℃' }}</p>
            <p class="day-night">{{ this.$store.state.weather.forecast[0].tempDay + '℃' + ' / ' + this.$store.state.weather.forecast[0].tempNight + '℃' }}</p>
            <p class="nowea">
                <span>{{ this.$store.state.weather.forecast[0].conditionDay }}</span> &nbsp;
                <span>{{ this.$store.state.weather.forecast[0].windDirDay }}</span>
            </p>
        </div>
        <div class="location">
            <p class="city" @click="toggleFlag">
                <span>{{ this.$store.state.weather.city.pname }}</span> &nbsp;
                <span>{{ this.$store.state.weather.city.name }}</span>
            </p>
            <p class="updatetime">更新时间：{{ this.$store.state.weather.forecast[0].updatetime }}</p>
        </div>
        <City v-show="flag" @toggle='toggleFlag'></City>       
        <div class="threedays">
            <ul class="three clearfix">
                <li>
                    <p class="today">{{ this.$store.state.weather.forecast[0].predictDate | dateFormat }}</p>
                    <div class="imgs">
                        <img :src="require('../../assets/weathers/W'+ this.$store.state.weather.forecast[0].conditionIdDay+'.png')" alt="">
                        <br>
                        <img :src="require('../../assets/weathers/W'+ this.$store.state.weather.forecast[0].conditionIdNight+'.png')" alt="">
                    </div>
                    <p class="temp">{{ this.$store.state.weather.forecast[0].tempDay }}℃</p>
                </li>
                <li>
                    <p class="today">{{ this.$store.state.weather.forecast[1].predictDate | dateFormat }}</p>
                    <div class="imgs">
                        <img :src="require('../../assets/weathers/W'+ this.$store.state.weather.forecast[1].conditionIdDay+'.png')" alt="">
                        <br>
                        <img :src="require('../../assets/weathers/W'+ this.$store.state.weather.forecast[1].conditionIdNight+'.png')" alt="">
                    </div>
                    <p class="temp">{{ this.$store.state.weather.forecast[1].tempDay }}℃</p>
                </li>
                <li>
                    <p class="today">{{ this.$store.state.weather.forecast[2].predictDate | dateFormat }}</p>
                    <div class="imgs">
                        <img :src="require('../../assets/weathers/W'+ this.$store.state.weather.forecast[2].conditionIdDay+'.png')" alt="">
                        <br>
                        <img :src="require('../../assets/weathers/W'+ this.$store.state.weather.forecast[2].conditionIdNight+'.png')" alt="">
                    </div>
                    <p class="temp">{{ this.$store.state.weather.forecast[2].tempDay }}℃</p>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script>
import City from '../../components/City'
export default {
    name: 'Weather',
    data() {
        return {
            flag: false
        }
    },
    components: {
        City
    },
    methods: {
        toggleFlag () {
            this.flag = !this.flag
        }
    },
    filters: {
        dateFormat (date) {
            const day = date.split('-')
            return parseInt(day[1]) + '月' + parseInt(day[2]) + '日'
        }
    }
}
</script>

<style lang="scss" scoped>
.weather {
    text-align: center;
    background: #a19f9f;
    height: 100%;
    width: 100%;
    .nowtem {
        padding: 30px 0;
        p {
            margin: 3px 0;
            font-size: 14px;
            &.large {
                font-size: 38px;
            }
        }
    }
    .location {
        .city {
            width: fit-content;
            margin: 0 auto;
            padding: 5px;
        }
        .updatetime {
            margin: 6px 0;
            font-size: 14px;
            color: grey;
        }
    }
    .threedays {
        margin-top: 20px;
        .three {
            border-top: 1px solid #f2f2f2;
            border-bottom: 1px solid #f2f2f2;
            li {
                width: 33.3%;
                float: left;
                font-size: 15px;
                .imgs {
                    img {
                        width: 35px;
                        margin: 3px 0;
                    }
                }
            }
        }
    }
}
</style>
