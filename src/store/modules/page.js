import axios from 'axios';
import * as types from './types';
import api from './api';

const state = {
  list: null,
  total: null,
};

const mutations = {
  [types.PAGEQUERY](state, payload) {
    state.list = payload.data;
    state.total = payload.total;
  },
};

const actions = {
  async add({ commit }, paging = {}) {
    const res = await axios.post(api.PageAdd, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async updata({ commit }, paging = {}) {
    const res = await axios.post(api.PageUpdata, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async delete({ commit }, paging = {}) {
    const res = await axios.post(api.PageDelete, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async query({ commit }, paging = {}) {
    const res = await axios.post(api.PageQuery, { ...paging });
    if (res.data.errcode == 0) {
      commit(types.PAGEQUERY, { data: res.data.data, total: res.data.total });
      return res;
    } else {
      return res;
    }
  },
  async fetch({ commit }, paging = {}) {
    const res = await axios.post(api.PageFetch, { ...paging });
    if (res.data.errcode == 0) {
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
