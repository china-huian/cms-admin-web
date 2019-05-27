import axios from 'axios';
import * as types from './types';
import api from './api';

const state = {
  list: null,
  total: null,
};

const mutations = {
  [types.NavQUERY](state, payload) {
    state.list = payload.data;
    state.total = payload.total;
  },
};

const actions = {
  async add({ commit }, paging = {}) {
    const res = await axios.post(api.NavAdd, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async updata({ commit }, paging = {}) {
    const res = await axios.post(api.NavUpdata, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async delete({ commit }, paging = {}) {
    const res = await axios.post(api.NavDelete, { ...paging });
    if (res.data.errcode == 0) {
      return res;
    } else {
      return res;
    }
  },
  async query({ commit }, paging = {}) {
    const res = await axios.post(api.NavQuery, { ...paging });
    if (res.data.errcode == 0) {
      commit(types.NavQUERY, { data: res.data.data, total: res.data.total });
      return res;
    } else {
      return res;
    }
  },
  async fetch({ commit }, paging = {}) {
    const res = await axios.post(api.NavFetch, { ...paging });
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
