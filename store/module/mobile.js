const state = {
  isMobile: false
}
const getters = {
  isMobile: s => {
    return s.isMobile
  }
}
const mutations = {
  setIsMobile: (s, mobile) => {
    s.isMobile = mobile
  }
}
const actions = {
  setIsMobile: ({ commit }, mobile) => {
    commit('setIsMobile', mobile)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
