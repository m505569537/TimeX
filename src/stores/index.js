import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

import { reqRegister, reqLogin, reqAutoLogin, reqWeather, addAccount, reqAccount, deleteAccount, addCollect, reqCollect } from '../api'
import user from './user'
import weather from './weather'
import account from './account'
import collection from './collection'

Vue.prototype.axios = axios
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user,
    weather,
    account,
    collection
  },
  mutations: {
    recordUser (state, user) {
      state.user = user
    },
    recordWea (state, data) {
      state.weather = data
    },
    reqAcc (state, records) {
      state.account.list = records
      this.commit('inAndOut')
    },
    addAcc (state, record) {
      state.account.list.unshift(record)
      this.commit('inAndOut')
    },
    inAndOut (state) {
      state.account.income = 0
      state.account.expenditure = 0
      const arr = state.account.list
      for(var i = 0; i < arr.length; i++){
        if(arr[i].type==='0'){
          state.account.income += parseInt(arr[i].money)
        } else {
          state.account.expenditure += parseInt(arr[i].money)
        }
      }
    },
    addCol (state, info) {
      state.collection.incomplete.unshift(info)
    },
    getCol (state, data) {
      state.collection = data
    },
    comCol (state, info) {
      if(info.completed===true){
        state.collection.incomplete = state.collection.incomplete.filter( item => item._id!==info._id)
        state.collection.completed.push(info)
      } else {
        state.collection.completed = state.collection.completed.filter( item => item._id!==info._id)
        state.collection.incomplete.push(info)
      }
    },
    modifyCol (state, info) {
      if(info.completed===false){
        state.collection.incomplete = state.collection.incomplete.map(item => {
          if(item._id === info._id){
            item = info
          }
        })
      } else {
        state.collection.completed = state.collection.completed.map(item => {
          if(item._id === info._id){
            item = info
          }
        })
      }
    }
  },
  actions: {
    // user
    // 注册
    register ({ commit }, user) {
      // console.log(user);
      commit('recordUser', user)
    },
    async registerAsync ({ dispatch },user) {
      const res = await reqRegister(user)
      const result = res.data
      if(result.code===0){
        window.location.href = '/#/home'
        return dispatch('register', result.data)
      }
    },
    // 登陆
    login ({ commit }, user) {
      commit('recordUser', user)
    },
    async loginAsync ({ dispatch }, user) {
      const res = await reqLogin(user)
      const result = res.data
      if(result.code===0){
        window.location.href = '/#/home'
        return dispatch('login', result.data)
      }
    },
    // 自动登陆
    autoLogin ({ commit }, user) {
      commit('recordUser', user)
    },
    async autoLoginAsync ({ dispatch }, userid) {
      const res = await reqAutoLogin(userid)
      const result = res.data
      if(result.code===0){
        dispatch('autoLogin', result.data)
      }
    },
    // weather
    getWeather ({ commit }, data) {
      commit('recordWea', data)
    },
    async getWeatherAsync ({ dispatch }, cityId){
      // console.log(cityId);
      const res = await reqWeather(cityId)
      const result = res.data
      // console.log(result);
      if(result.code===0){
        const { city, forecast } = result.data
        dispatch('getWeather', { city, forecast })
      }
    },

    // account
    // addaccount
    addAccount ({ commit },record) {
      commit('addAcc',record)
    },
    async addAccountAsync ({ dispatch }, record) {
      const res = await addAccount(record)
      // console.log(res);
      const result = res.data
      if(result.code===0){
        dispatch('addAccount',result.data)
      }
    },
    //reqaccount
    reqAccount ({ commit }, records) {
      commit('reqAcc', records)
    },
    async reqAccountAsync ({ dispatch }, obj) {
      const res = await reqAccount(obj)
      const result = res.data
      if(result.code===0){
        dispatch('reqAccount', result.data)
      }
    },
    // deleteaccount
    delAccountAsync ({ }, _id) {
      deleteAccount(_id)
    },

    // collections
    // addcollect
    addCollect ({ commit }, info) {
      commit('addCol', info)
    },
    async addCollectAsync ({ dispatch }, info) {
      const res = await addCollect(info)
      const result = res.data
      // console.log(result);
      if(result.code===0){
        dispatch('addCollect', result.data)
      }
    },
    // reqcollect
    getCollect ({ commit },data) {
      commit('getCol',data)
    },
    async getCollectAsync ({ dispatch }, userid) {
      const res = await reqCollect(userid)
      const result = res.data
      // console.log(result.data);
      if(result.code===0){
        dispatch('getCollect',result.data)
      }
    }
  }
});
