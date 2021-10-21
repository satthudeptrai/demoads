const state = {
  showDraw: false,
  isTemp: true
}
const getters = {
  showDraw: (s) => {
    return s.showDraw
  },
  isTemp: s => {
    return s.isTemp
  }
}
const mutations = {
  setShowDraw: (s, show) => {
    s.showDraw = show
  },
  setIsTemp: (s, temp) => {
    s.isTemp = temp
  }
}
const actions = {
  setShowDraw: ({ commit }, show) => {
    commit('setShowDraw', show)
  },
  setIsTemp: ({ commit }, temp) => {
    commit('setIsTemp', temp)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
