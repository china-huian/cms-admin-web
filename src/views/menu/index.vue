<template>
  <div>
    <div class="fj">
      <h2 class="fd1"><i>|</i> 菜单管理</h2>
      <el-button class="fd2 add" type="primary" @click="reload">添加一级菜单</el-button>
    </div>
    <div class="treebox fj">
      <tree :list="list" v-on:value="val" class="tree fd1"></tree>
      <div class="formbox fd2">
        <menu-form :id="id" :datas="res" v-on:Success="add"></menu-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import tree from '@/components/tree';
import MenuForm from '@/components/menu-form';
export default {
  name: 'menus',
  data() {
    return {
      id: null,
      res: null,
    };
  },
  methods: {
    ...mapActions('menu', ['query']),
    add() {
      this.query();
    },
    // 树传出的值
    async val({ id, data }) {
      this.id = id;
      this.res = data;
    },
    // 添加一级清空值
    reload() {
      this.id = null;
      this.res = null;
    },
  },
  mounted() {
    this.query();
  },
  components: {
    tree,
    MenuForm,
  },
  computed: {
    ...mapState({
      list: state => state.menu.list,
    }),
  },
};
</script>
