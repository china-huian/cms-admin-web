import axios from 'axios';
import * as types from './types';
import api from './api';

const state = {
  list: null,
  total: null,
};

const mutations = {
  [types.CONTENTQUERY](state, payload) {
    state.list = payload.data;
    state.total = payload.total;
  },
};

const actions = {
  async add({ commit }, paging = {}) {
    const res = await axios.post(api.ContentAdd, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async updata({ commit }, paging = {}) {
    const res = await axios.post(api.ContentUpdata, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async delete({ commit }, paging = {}) {
    const res = await axios.post(api.ContentDelete, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async query({ commit }, paging = {}) {
    const res = await axios.post(api.ContentQuery, { ...paging });
    if (res.data.errcode == 0) {
      commit(types.CONTENTQUERY, { data: res.data.data, total: res.data.total });
      return res;
    } else {
      return res;
    }
  },
  async fetch({ commit }, paging = {}) {
    const res = await axios.post(api.ContentFetch, { ...paging });
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
