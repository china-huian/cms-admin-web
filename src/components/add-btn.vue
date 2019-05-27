<template>
  <div>
    <el-button class="fd2 add" type="primary" @click="add">添加{{ text }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'add-btn',
  data() {
    return {};
  },
  methods: {
    add(id) {
      this.$router.push({ path: '/' + this.$route.name + '/forms' });
    },
  },
  mounted() {},
  props: {
    text: null,
  },
};
</script>
