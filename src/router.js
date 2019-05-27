import Vue from 'vue';
import Router from 'vue-router';
import column from './views/column';
import ColumnForm from './views/column/forms.vue';
import page from './views/page';
import PageForm from './views/page/forms.vue';
import menu from './views/menu';
import info from './views/info';
import InfoForm from './views/info/forms.vue';
import content from './views/content';
import ContentForm from './views/content/forms.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'column',
      component: column,
    },
    {
      path: '/column/forms',
      name: 'column/forms',
      component: ColumnForm,
    },
    {
      path: '/page',
      name: 'page',
      component: page,
    },
    {
      path: '/page/forms',
      name: 'page/forms',
      component: PageForm,
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu,
    },
    {
      path: '/info',
      name: 'info',
      component: info,
    },
    {
      path: '/info/forms',
      name: 'info/forms',
      component: InfoForm,
    },
    {
      path: '/content',
      name: 'content',
      component: content,
    },
    {
      path: '/content/forms',
      name: 'content/forms',
      component: ContentForm,
    },
  ],
});

export default router;
let num = 0;
router.beforeEach((to, from, next) => {
  num++;
  if (to.path !== '/' && num == 1) {
    next('/');
  } else {
    next();
  }
});
