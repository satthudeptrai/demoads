const state = {
  tagCam: [],
  tagAdGroup: [],
  tagAd: []
}
const getters = {
  tagCam: (s) => {
    return s.tagCam
  },
  tagAdGroup: (s) => {
    return s.tagAdGroup
  },
  tagAd: (s) => {
    return s.tagAd
  }
}
const mutations = {
  setTagCam: (s, tag) => {
    s.tagCam = tag
  },
  setTagAdGroup: (s, tag) => {
    s.tagAdGroup = tag
  },
  setTagAd: (s, tag) => {
    s.tagAd = tag
  }
}
const actions = {
  setTagCam: ({ commit }, tag) => {
    commit('setTagCam', tag)
  },
  setTagAdGroup: ({ commit }, tag) => {
    commit('setTagAdGroup', tag)
  },
  setTagAd: ({ commit }, tag) => {
    commit('setTagAd', tag)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
