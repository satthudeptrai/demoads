const state = {
    indexAdGroup: 0,
    idAdGroup: '',
    itemAdGroup: {
      name: 'Nhóm quảng cáo',
      optimization_goal: 'CONVERSATIONS',
      billing_event: 'IMPRESSIONS',
      bid_amount: 100000,
      budget: 30000,
      budget_type: 1,
      campaign_id: null,
      promoted_object: {
        page_id: ''
      },
      targeting: {
        geo_locations: {
          countries: ['VN']
        },
        age_max: 13,
        age_min: 13,
        interests: [],
        locales: [],
        genders: 0,
        publisher_platforms: [],
      },
      start_time: new Date(),
      end_time: '',
      status: 'PAUSED'
    }
  }
  const getters = {
    itemAdGroup: s => {
      return s.itemAdGroup
    },
    idAdGroup: s => {
      return s.idAdGroup
    },
    indexAdGroup: s => {
      return s.indexAdGroup
    }
  }
  const mutations = {
    setItemAdGroup: (s, item) => {
      s.itemAdGroup = item
    },
    setIdAdGroup: (s, id) => {
      s.idAdGroup = id
    },
    setIndexAdGroup: (s, index) => {
      s.indexAdGroup = index
    }
  }
  const actions = {
    setItemAdGroup: ({ commit }, item) => {
      commit('setItemAdGroup', item)
    },
    setIdAdGroup: ({ commit }, id) => {
      commit('setIdAdGroup', id)
    },
    setIndexAdGroup: ({commit}, index) => {
      commit('setIndexAdGroup', index)
    }
  }
  export default {
    state,
    getters,
    mutations,
    actions
  }
  