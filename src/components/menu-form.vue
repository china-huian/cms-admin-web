<template>
  <div>
    <el-form :inline="false" :model="formInline" class="formlist">
      <h2 v-if="children">添加二级菜单</h2>
      <h2 v-if="formInline._id && id && !children">一级菜单</h2>
      <h2 v-if="!formInline._id && id && !children">二级菜单</h2>
      <el-form-item label="菜单名称" required>
        <el-input v-model="formInline.name" placeholder="请填写菜单名称" class="forms"></el-input>
      </el-form-item>
      <el-form-item label="类型选择">
        <el-select v-model="formInline.type" @change="types(formInline.type)" placeholder="类型选择" class="forms">
          <el-option label="空" :value="null"></el-option>
          <el-option label="栏目" value="0"></el-option>
          <el-option label="单页" value="1"></el-option>
          <el-option label="链接" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定ID" v-if="formInline.type !== '2'">
        <el-select v-model="formInline.binding" placeholder="绑定ID" class="forms">
          <el-option label="空" :value="null"></el-option>
          <el-option v-for="(item, index) in typelist" :label="item.name" :key="index" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" required>
        <el-input @change="changeNumber(formInline.index)" v-model="formInline.index" placeholder="请填写排序数字" class="forms"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" v-if="formInline.type == '2'" required>
        <el-input v-model="formInline.url" placeholder="请填链接地址" class="forms"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddChildren" v-if="id && children !== true">添加二级菜单</el-button>
        <em v-if="children !== true" :class="{ em: id !== null }">
          <el-button type="primary" @click="Add" v-if="id == null">确认添加</el-button>
          <el-button type="primary" @click="UpData" v-else>确认修改</el-button>
        </em>
        <el-button type="primary" @click="ChildrenAdd" v-else>确认添加</el-button>
        <el-button type="danger" @click="remove" v-if="id">确认删除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions: pageActions } = createNamespacedHelpers('page');
const { mapActions: columnActions } = createNamespacedHelpers('column');
const { mapActions } = createNamespacedHelpers('menu');
export default {
  name: 'menu-form',
  data() {
    return {
      children: false, // 样式切换
      typelist: null, // 类型切换
      formInline: {
        // 数据
        name: null,
        type: null,
        binding: null,
        index: null,
        url: null,
        children: Array,
      },
      Deposit: null, // 存储返回数据
    };
  },
  methods: {
    ...pageActions({ queryPage: 'query' }),
    ...columnActions({ queryColumn: 'query' }),
    ...mapActions(['query', 'add', 'updata', 'delete', 'fetch']),
    open(msg) {
      this.$message({
        message: msg,
        type: 'success',
      });
    },
    // 类型切换处理
    async types(type) {
      if (type == '0') {
        const res = await this.queryColumn();
        this.typelist = res.data.data;
      } else if (type == '1') {
        const res = await this.queryPage();
        this.typelist = res.data.data;
      }
    },
    // 添加
    async Add() {
      if (this.formInline.name !== null && this.formInline.index !== null) {
        if (this.formInline.type == '2' && this.formInline.url == null) {
          this.$message.error('类型为链接，请填写链接地址');
          return false;
        }
        const res = await this.add({ ...this.formInline });
        if (res.data.errcode == 0) {
          this.open('添加成功');
          this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
          this.$emit('Success');
        }
      } else {
        this.$message.error('请填写必填项');
      }
    },
    // 修改
    async UpData() {
      if (this.formInline._id && this.formInline.children.length > 0 && this.formInline.type !== null) {
        this.$message.error('存在二级菜单，不能修改类型');
        return false;
      }
      if (this.formInline.name && this.formInline.index) {
        if (this.formInline.type == '2' && this.formInline.url == null) {
          this.$message.error('类型为链接，请填写链接地址');
          return false;
        }
        if (this.formInline._id) {
          // 判断是不是一级
          if (this.formInline.type == null) {
            this.formInline.url = null;
            this.formInline.binding = null;
          }
          const res = await this.updata({ ...this.formInline, id: this.id });
          if (res.data.errcode == 0) {
            this.open('修改成功');
            this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
            this.$emit('Success');
          }
        } else {
          // 是二级
          for (let i = 0; i < this.Deposit.children.length; i++) {
            if (this.formInline.id == this.Deposit.children[i].id) {
              this.Deposit.children[i] = this.formInline;
              const res = await this.updata({ ...this.Deposit, id: this.id });
              if (res.data.errcode == 0) {
                this.open('修改成功');
                this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
                this.$emit('Success');
              }
            }
          }
        }
      } else {
        this.$message.error('请填写必填项');
      }
    },
    // 二级菜单样式切换
    AddChildren() {
      if (this.formInline.type == null && this.formInline.binding == null) {
        if (this.formInline._id) {
          this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
          this.children = true;
        } else {
          this.$message.error('只允许给一级菜单添加');
        }
      } else {
        this.$message.error('一级菜单类型与绑定ID应该为空');
      }
    },
    // 添加二级菜单
    async ChildrenAdd() {
      if (this.formInline.name && this.formInline.index) {
        if (this.formInline.type == '2' && this.formInline.url == null) {
          this.$message.error('类型为链接，请填写链接地址');
          return false;
        }
      } else {
        this.$message.error('请填写必填项');
        return false;
      }
      // 构造ID
      this.formInline.id = Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(36);
      this.Deposit.children.push(this.formInline);
      const res = await this.updata({ ...this.Deposit, id: this.id });
      if (res.data.errcode == 0) {
        this.open('添加成功');
        this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
        this.$emit('Success');
        this.children = false;
      }
    },
    // 删除
    async remove() {
      if (!this.formInline._id) {
        // 判断是不是一级
        for (let i = 0; i < this.Deposit.children.length; i++) {
          if (this.formInline.id == this.Deposit.children[i].id) {
            this.Deposit.children.splice(i, 1);
            const res = await this.updata({ ...this.Deposit, id: this.id });
            if (res.data.errcode == 0) {
              this.open('删除成功');
              this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
              this.$emit('Success');
            }
          }
        }
      } else {
        // 是一级
        const res = await this.delete({ id: this.id });
        if (res.data.errcode == 0) {
          this.open('删除成功');
          this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
          this.$emit('Success');
        }
      }
    },
    changeNumber(val) {
      if (Number(val)) {
        this.formInline.index = Number(val);
      } else {
        this.formInline.index = null;
        this.$message.error('请填写数字');
      }
    },
  },
  mounted() {},
  props: {
    id: null,
    datas: null,
  },
  watch: {
    // 监听id
    id: async function(val) {
      if (val !== null) {
        const res = await this.fetch({ id: this.id });
        this.Deposit = res.data.data;
        this.children = false;
      }
    },
    datas: async function(val) {
      if (val !== null) {
        this.formInline = { ...val };
        this.types(val.type);
        this.children = false;
      } else {
        this.formInline = { name: null, type: null, binding: null, index: null, url: null, children: Array };
        this.children = false;
      }
    },
  },
};
</script>
