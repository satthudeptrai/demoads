const state = {
  listAdGroup: [
    {
      id: "",
      listAds: [
        {
          id: ""
        }
      ]
    }
  ]
};
const getters = {
  listAdGroup: s => {
    return s.listAdGroup;
  }
};
const mutations = {
  setListAdGroup: (s, list) => {
    s.listAdGroup = list;
  }
};
const actions = {
  setListAdGroup: ({ commit }, list) => {
    commit("setListAdGroup", list);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
