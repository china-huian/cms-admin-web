<template>
  <div>
    <div class="fj">
      <h2 class="fd1"><i>|</i> 栏目管理</h2>
      <el-button class="fd2 add" type="primary" @click="AddTo" v-if="id == null">确认添加</el-button>
      <el-button class="fd2 add" type="primary" @click="UpData" v-else>确认修改</el-button>
    </div>
    <el-input v-model="name" placeholder="请填写功能名称" class="form"></el-input>
    <el-input v-model="key" placeholder="请填写属性名" class="form"></el-input>
    <el-input type="textarea" :rows="8" placeholder="请输入属性值" class="form" v-model="value"> </el-input>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'forms',
  data() {
    return {
      name: null,
      key: null,
      value: null,
      id: null,
    };
  },
  methods: {
    ...mapActions('info', ['add', 'fetch', 'updata']),
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
      if (this.name && this.key && this.value) {
        const res = await this.add({ name: this.name, key: this.key, value: this.value });
        if (res.data.errcode == 0) {
          this.open('添加成功');
          this.name = null;
          this.key = null;
          this.value = null;
        }
      } else {
        this.openerr('请填写完整信息');
      }
    },
    async UpData() {
      if (this.name && this.key && this.value && this.id) {
        const res = await this.updata({ name: this.name, key: this.key, value: this.value, id: this.id });
        if (res.data.errcode == 0) {
          this.open('修改成功');
          this.name = null;
          this.$router.push({ name: 'info' });
        }
      } else {
        this.openerr('请填写完整信息');
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
        this.key = res.data.data.key;
        this.value = res.data.data.value;
      }
    }
  },
};
</script>
