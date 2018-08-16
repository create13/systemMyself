const headerList = {
  state: {
    dataList: []
  },
  actions: {
    actionCreate ({ commit }, datas) {
      commit('createList', datas);
    },
    actionDel ({ commit }, delData) {
      commit('delList', delData);
    }
  },
  mutations: {
    createList (state, datas) {
      state.dataList.push(datas);
    },
    delList (state, delData) {
      for (let v = 0; v < state.dataList.length; v++) {
        if (state.dataList[v] === delData) {
          state.dataList.splice(v, 1);
        }
      }
    }
  },
  getters: {
    doFilter: state => {
      return [...new Set(state.dataList)];
    }
  }
};
export default headerList;
