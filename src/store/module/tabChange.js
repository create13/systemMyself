const tabSave = {
  state: {
    infoTabs: null
  },
  actions: {
    saveTab ({commit}, response) {
      commit('saveDatas', response);
    }
  },
  mutations: {
    saveTabs (state, datas) {
      state.infoTabs = datas;
      sessionStorage.setItem('infoTabs', JSON.stringify(datas));
    }
  },
  getters: {
    getTabs: state => {
      if (!state.infoTabs) {
        let getRead = sessionStorage.getItem('infoTabs');
        state.infoTabs = JSON.parse(getRead);
      }
      return state.infoTabs;
    }
  }
};
export default tabSave;
