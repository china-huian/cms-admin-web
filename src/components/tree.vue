<template>
  <div class="tree">
    <el-tree :data="list" accordion :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>
<script>
export default {
  name: 'tree',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  methods: {
    // 点击树传出值
    handleNodeClick(data, key) {
      this.$emit('value', { id: data._id || key.parent.data._id, data: data });
    },
  },
  props: {
    list: null,
  },
};
</script>
