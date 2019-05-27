<template>
  <div>
    <div class="fj">
      <h2 class="fd1"><i>|</i> 内容管理</h2>
      <el-button class="fd2 add" type="primary" @click="AddTo" v-if="id == null">确认添加</el-button>
      <el-button class="fd2 add" type="primary" @click="UpData" v-else>确认修改</el-button>
    </div>
    <el-select v-model="datas.state" placeholder="请选择状态" class="form">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-input v-model="datas.name" placeholder="请填写标题" class="form"></el-input>
    <el-input @change="changeNumber(datas.index)" v-model="datas.index" placeholder="排序" class="form"></el-input>
    <wangeditor v-if="id == null || datas.content !== null" v-model="datas.content"></wangeditor>
    <div class="label add fd2">
      <el-input v-for="(item, index) in datas.label" :key="index" v-model="item.label" class="labelinput"></el-input>
      <el-button type="primary" @click="LabelAdd">添加标签</el-button>
    </div>
    <up-load class="upload" v-on:handleRemove="files" :listfile="datas.annex"></up-load>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import wangeditor from '@/components/wangeditor.vue';
import UpLoad from '@/components/up-load.vue';
export default {
  name: 'forms',
  data() {
    return {
      id: null,
      datas: {
        // 表单绑定数据
        name: null,
        content: null,
        label: [],
        file: null,
        state: null,
        index: null,
        binding: null,
        annex: [],
      },
      options: [{ label: '草稿', value: '草稿' }, { label: '发布', value: '发布' }],
    };
  },
  methods: {
    ...mapActions('content', ['add', 'fetch', 'updata']),
    open(msg) {
      // 成功弹窗
      this.$message({
        message: msg,
        type: 'success',
      });
    },
    openerr(msg) {
      // 错误弹窗
      this.$message.error(msg);
    },
    async AddTo() {
      // 添加
      if (this.datas.name && this.datas.content && this.datas.state && this.datas.binding) {
        const res = await this.add({ ...this.datas });
        if (res.data.errcode == 0) {
          this.open('添加成功');
          this.$router.push({ path: '/content', query: { id: this.datas.binding } });
        }
      } else {
        this.openerr('请填完整信息内容');
      }
    },
    async UpData() {
      // 修改
      if (this.datas.name && this.datas.content && this.datas.state && this.id) {
        const res = await this.updata({ ...this.datas, id: this.id });
        if (res.data.errcode == 0) {
          this.open('修改成功');
          this.$router.push({ path: '/content', query: { id: this.datas.binding } });
        }
      } else {
        this.openerr('请填完整信息内容');
      }
    },
    LabelAdd() {
      // 添加标签
      for (let i = 0; i < this.datas.label.length; i++) {
        if (this.datas.label[i].label == null) {
          this.openerr('填写完成标签才可以新建标签呦！');
          return false;
        }
      }
      this.datas.label.push({ label: null });
    },
    files({ file }) {
      // 监听子组件传出的文件列表  赋值给当datas文件列表
      this.datas.annex = file;
    },
    changeNumber(val) {
      if (val) {
        if (Number(val)) {
          if (this.id) {
            this.datas.index = Number(val);
          }
        } else {
          this.$message.error('请填写数字');
        }
      }
    },
  },
  async mounted() {
    this.datas.binding = this.$route.query.bindingid; // 绑定id
    let id = this.$route.query.id; // 数据id
    if (id) {
      this.id = id;
      const res = await this.fetch({ id });
      if (res.data.errcode == 0) {
        this.datas = res.data.data;
      }
    }
  },
  components: {
    wangeditor,
    UpLoad,
  },
};
</script>
