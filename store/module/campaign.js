const state = {
  idCampaign: '',
  itemCampaign: {
    name: 'Chiến dịch mới',
    status: 'PAUSED',
    spend_cap: 0,
    bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
    budget: 30000,
    budget_type: 1,
    buying_type: 'AUCTION',
    objective: 'MESSAGES',
    special_ad_categories: []
  }
}
const getters = {
  itemCampaign: s => {
    return s.itemCampaign
  },
  idCampaign: s => {
    return s.idCampaign
  }
}
const mutations = {
  setItemCampaign: (s, item) => {
    s.itemCampaign = item
  },
  setIdCampaign: (s, id) => {
    s.idCampaign = id
  }
}
const actions = {
  setItemCampaign: ({ commit }, item) => {
    commit('setItemCampaign', item)
  },
  setIdCampaign: ({ commit }, id) => {
    commit('setIdCampaign', id)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
