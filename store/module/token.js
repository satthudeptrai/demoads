import { getToken, setToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const getters = {
  token: s => {
    return s.token
  }
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
    setToken(token)
  }
}

const actions = {
//   login({ commit }, userInfo) {
//     const { email, password } = userInfo;
//     return new Promise((resolve, reject) => {
//       login({ email: email.trim(), password: password })
//         .then(response => {
//           commit('SET_TOKEN', response.token);
//           setToken(response.token);
//           resolve();
//         })
//         .catch(error => {
//           reject(error);
//         });
//     });
//   }
  setToken: ({ commit }, token) => {
    commit('setToken', token)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
