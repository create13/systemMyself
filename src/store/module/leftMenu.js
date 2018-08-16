const menuSave = {
  state: {
    infoMenu: null
  },
  actions: {
    saveMenu ({commit}, response) {
      commit('saveMenus', response);
    }
  },
  mutations: {
    saveMenus (state, datas) {
      state.infoMenu = datas;
      sessionStorage.setItem('infoMenu', JSON.stringify(datas));
    }
  },
  getters: {
    getMenus: state => {
      if (!state.infoMenu) {
        let getRead = sessionStorage.getItem('infoMenu');
        state.infoMenu = JSON.parse(getRead);
      }
      return state.infoMenu;
    }
  }
};
export default menuSave;
