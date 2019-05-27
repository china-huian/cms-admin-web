<template>
  <div class="fj app">
    <sidebar class="fd1"></sidebar>
    <router-view class="fd2 box" />
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar';
export default {
  name: 'app',
  components: {
    Sidebar,
  },
};
</script>

<style lang="less"></style>
