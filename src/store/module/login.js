const loginSave = {
  state: {
    userInfo: null
  },
  actions: {
    saveInfo ({commit}, response) {
      commit('saveDatas', response);
    }
  },
  mutations: {
    saveDatas (state, datas) {
      state.userInfo = datas;
      sessionStorage.setItem('userInfo', JSON.stringify(datas));
    }
  },
  getters: {
    getInfo: state => {
      if (!state.userInfo) {
        let param = sessionStorage.getItem('userInfo');
        state.userInfo = JSON.parse(param);
      }
      return state.userInfo;
    }
  }
};
export default loginSave;
