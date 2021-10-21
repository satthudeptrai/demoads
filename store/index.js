import Vue from 'vue'
import Vuex from 'vuex'
import tag from './module/tag'
import draw from './module/draw'
import campaign from './module/campaign'
import isMobile from './module/mobile'
import token from './module/token'
import radio from './module/radio'
import adGroup from './module/adGroup'
import ads from './module/ads'
import listAdGroup from './module/listAdGroup'
import user from './module/user'
import post from './module/post'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    tag, draw, campaign, isMobile, token, radio, adGroup, ads, listAdGroup, user, post
  }
})
