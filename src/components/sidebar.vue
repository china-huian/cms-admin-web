<template>
  <div class="sidebar">
    <img src="../../public/static/img/logo.png" class="logo" />
    <el-menu default-active="1-0" @open="handleOpen" class="el-menu-vertical-demo btn" background-color="#000" text-color="#fff" active-text-color="#ffd04b">
      <div v-for="(item, idx) in list" :key="idx">
        <el-menu-item v-if="item.type !== 1" :index="'1-' + idx" @click="link(item.link)">
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <drop-down-menu :list="item" v-else></drop-down-menu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DropDownMenu from '@/components/drop-down-menu';
export default {
  name: 'sidebar',
  data() {
    return {};
  },
  methods: {
    ...mapActions('sidebar', ['query']),
    handleOpen(key, keyPath) {
      this.query();
    },
    link(address) {
      this.$router.push({ name: address });
    },
  },
  mounted() {},
  components: {
    DropDownMenu,
  },
  computed: {
    ...mapState({
      list: state => state.sidebar.list,
    }),
  },
};
</script>
