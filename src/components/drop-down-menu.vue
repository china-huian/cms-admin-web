<template>
  <div>
    <el-submenu index="2">
      <template slot="title">
        <span class="fd1">{{ list.name }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="(item, index) in list.data" :key="index" :index="'2-' + index" @click="link(item._id)">{{ item.name }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'drop-down-menu',
  data() {
    return {};
  },
  methods: {
    link(id) {
      this.$router.push({ name: 'content', query: { id: id } });
    },
  },
  props: {
    list: null,
  },
};
</script>
