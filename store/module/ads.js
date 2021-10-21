const state = {
    indexAds: 0,
    idAds: '',
    itemAd: {
      name: 'Quảng cáo mới',
      adset_id: null,
      creative: {
        creative_id: ""
      },
      status: 'PAUSED'
    }
  }
  const getters = {
    itemAd: s => {
      return s.itemAd
    },
    idAds: s => {
      return s.idAds
    },
    indexAds: s => {
      return s.indexAds
    }
  }
  const mutations = {
    setItemAd: (s, item) => {
      s.itemAd = item
    },
    setIdAds: (s, id) => {
      s.idAds = id
    },
    setIndexAds: (s, index) => {
      s.indexAds = index
    }
  }
  const actions = {
    setItemAd: ({ commit }, item) => {
      commit('setItemAd', item)
    },
    setIdAds: ({commit}, id) => {
      commit('setIdAds' , id)
    },
    setIndexAds: ({commit}, index) => {
      commit('setIndexAds', index)
    }
  }
  export default {
    state,
    getters,
    mutations,
    actions
  }
  