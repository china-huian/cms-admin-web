import Vue from 'vue';
import Vuex from 'vuex';
import sidebar from './modules/sidebar';
import column from './modules/column';
import page from './modules/page';
import menu from './modules/menu';
import info from './modules/info';
import content from './modules/content';
import file from './modules/file';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    sidebar,
    column,
    page,
    menu,
    info,
    content,
    file,
  },
});
