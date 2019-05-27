<template>
  <div class="list">
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="skip" :page-size="limit" layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  data() {
    return {
      skip: 1,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.skip = val;
      this.$emit('pagination', { skip: this.skip, limit: this.limit });
    },
  },
  props: {
    total: null,
    limit: null,
  },
};
</script>
