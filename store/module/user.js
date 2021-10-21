const state = {
  userId: ''
};
const getters = {
    userId: s => {
    return s.userId;
  }
};
const mutations = {
  setUserId: (s, value) => {
    s.userId = value;
  }
};
const actions = {
  setUserId: ({ commit }, value) => {
    commit("setUserId", value);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
