import axios from 'axios';
import * as types from './types';
import api from './api';
const state = {
  list: [
    { type: 0, name: '栏目管理', link: 'column' },
    { type: 0, name: '单页管理', link: 'page' },
    { type: 0, name: '菜单管理', link: 'menu' },
    { type: 1, name: '内容管理', link: 'content', data: [] },
    { type: 0, name: '配置管理', link: 'info' },
    // { type: 0, name: '媒体库', link: 'media' },
    // { type: 0, name: '模型管理', link: 'model' },
  ],
};

const mutations = {
  [types.COLUMNQUERY](state, payload) {
    for (let i = 0; i < state.list.length; i++) {
      if (state.list[i].type == 1) {
        state.list[i].data = payload;
      }
    }
  },
};

const actions = {
  async query({ commit }, paging = {}) {
    const res = await axios.post(api.ColumnQuery, { ...paging });
    if (res.data.errcode == 0) {
      commit(types.COLUMNQUERY, res.data.data);
      return res;
    } else {
      return res;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
