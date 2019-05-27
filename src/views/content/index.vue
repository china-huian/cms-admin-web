<template>
  <div>
    <div class="fj">
      <h2 class="fd1"><i>|</i> 内容管理</h2>
      <el-button class="fd2 add" type="primary" @click="link">内容添加</el-button>
    </div>
    <list :list="list" v-on:cutout="remove"></list>
    <pagination :limit="limit" :total="total" v-on:pagination="paging"></pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import List from '@/components/list';
import Pagination from '@/components/pagination';
export default {
  name: 'contents',
  data() {
    return {
      skip: 1,
      limit: 10,
      id: null,
    };
  },
  methods: {
    ...mapActions('content', ['query', 'delete']),
    paging({ skip, limit }) {
      // skip 页数  limit 条数
      this.limit = limit;
      this.skip = skip;
      this.query({ skip: skip, limit: limit, binding: this.id });
    },
    remove(id) {
      this.$confirm('是否删除该条数据', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.removeTow(id);
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    async removeTow(id) {
      const res = await this.delete({ id });
      if (res.data.errcode == 0) {
        if (this.skip > this.total / this.limit && this.skip > 1) {
          this.skip = this.skip - 1;
        }
        this.query({ skip: this.skip, limit: this.limit });
      }
    },
    link() {
      this.$router.push({ path: '/' + this.$route.name + '/forms', query: { bindingid: this.id } });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.query({ skip: 1, limit: this.limit, binding: this.id });
  },
  components: {
    List,
    Pagination,
  },
  computed: {
    ...mapState({
      list: state => state.content.list,
      total: state => state.content.total,
    }),
  },
  watch: {
    $route: function(params) {
      this.id = this.$route.query.id;
    },
    id: function(val) {
      this.query({ skip: 1, limit: this.limit, binding: this.id });
    },
  },
};
</script>
