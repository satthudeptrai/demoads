const state = {
  listPost: [],
  idPost: "",
  itemPost: {
    name: "",
    object_story_spec: {
        page_id: "",
        link_data: {
            link: ''
        }
    }
  },
  listFacebook: [
    {
      id: '',
      name: ''
    }
  ],
  listImg: [
    {
      id: 1,
      name: 'image1.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'image1.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'image1.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'image1.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'image1.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    }
  ],
  listVideo: [
    {
      id: 1,
      name: 'video.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'video.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'video.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'video.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    },
    {
      id: 1,
      name: 'video.png',
      link: 'https://thuvienanh.net/wp-content/uploads/2020/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6-1.jpg'
    }
  ]
};
const getters = {
  itemPost: s => {
    return s.itemPost;
  },
  idPost: s => {
    return s.idPost;
  },
  listPost: s => {
    return s.listPost
  },
  listFacebook: s => {
    return s.listFacebook
  },
  listImg: s => {
    return s.listImg
  },
  listVideo: s => {
    return s.listVideo
  },
};
const mutations = {
  setItemPost: (s, item) => {
    s.itemPost = item;
  },
  setIdPost: (s, id) => {
    s.idPost = id;
  },
  setListPost: (s, list) => {
    s.listPost = list
  },
  setListFacebook: (s, list) => {
    s.listFacebook = list
  },
  setListImg: (s, list) => {
    s.listImg = list
  },
  setListVideo: (s, list) => {
    s.listVideo = list
  }
};
const actions = {
  setItemPost: ({ commit }, item) => {
    commit("setItemPost", item);
  },
  setIdPost: ({ commit }, id) => {
    commit("setIdPost", id);
  },
  setListPost: ({commit}, list) => {
    commit("setListPost", list)
  },
  setListFacebook: ({commit}, list) => {
    commit("setListFacebook", list)
  },
  setListImg: ({commit}, list) => {
    commit("setListImg", list)
  },
  setListVideo: ({commit}, list) => {
    commit("setListVideo", list)
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
