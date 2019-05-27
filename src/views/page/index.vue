<template>
  <div>
    <div class="fj">
      <h2 class="fd1"><i>|</i> 单页管理</h2>
      <add-btn :text="'单页'"></add-btn>
    </div>
    <list :list="list" v-on:cutout="remove"></list>
    <pagination :limit="limit" :total="total" v-on:pagination="paging"></pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import List from '@/components/list';
import Pagination from '@/components/pagination';
import AddBtn from '@/components/add-btn';
export default {
  name: 'page',
  data() {
    return {
      skip: 1,
      limit: 10,
    };
  },
  methods: {
    ...mapActions('page', ['query', 'delete']),
    paging({ skip, limit }) {
      // skip 页数  limit 条数
      this.limit = limit;
      this.skip = skip;
      this.query({ skip: skip, limit: limit });
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
  },
  mounted() {
    this.query({ skip: 1, limit: this.limit });
  },
  components: {
    List,
    Pagination,
    AddBtn,
  },
  computed: {
    ...mapState({
      list: state => state.page.list,
      total: state => state.page.total,
    }),
  },
};
</script>
