const state = {
    radio: '',
    interactive: 'POST_ENGAGEMENT'
  }
  const getters = {
    radio: s => {
      return s.radio
    },
    interactive: s => {
      return s.interactive
    } 
  }
  const mutations = {
    setRadio: (s, value) => {
      s.radio = value
    },
    setInteractive: (s, value) => {
      s.interactive = value
    }
  }
  const actions = {
    setRadio: ({ commit }, value) => {
      commit('setRadio', value)
    },
    setInteractive: ({ commit }, value) => {
      commit('setInteractive', value)
    }
  }
  export default {
    state,
    getters,
    mutations,
    actions
  }
  