<template>
  <div>
    <div class="fj">
      <h2 class="fd1"><i>|</i> 栏目管理</h2>
      <el-button class="fd2 add" type="primary" @click="AddTo" v-if="id == null">确认添加</el-button>
      <el-button class="fd2 add" type="primary" @click="UpData" v-else>确认修改</el-button>
    </div>
    <el-input v-model="name" placeholder="请填写栏目名称" class="form"></el-input>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'forms',
  data() {
    return {
      name: null,
      id: null,
    };
  },
  methods: {
    ...mapActions('column', ['add', 'fetch', 'updata']),
    open(msg) {
      this.$message({
        message: msg,
        type: 'success',
      });
    },
    openerr(msg) {
      this.$message.error(msg);
    },
    async AddTo() {
      if (this.name) {
        const res = await this.add({ name: this.name });
        if (res.data.errcode == 0) {
          this.open('添加成功');
          this.name = null;
        }
      } else {
        this.openerr('请填写栏目名称');
      }
    },
    async UpData() {
      if (this.name) {
        const res = await this.updata({ id: this.id, name: this.name });
        if (res.data.errcode == 0) {
          this.open('修改成功');
          this.name = null;
          this.$router.push({ name: 'column' });
        }
      } else {
        this.openerr('请填写栏目名称');
      }
    },
  },
  async mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.id = id;
      const res = await this.fetch({ id });
      if (res.data.errcode == 0) {
        this.name = res.data.data.name;
      }
    }
  },
};
</script>
