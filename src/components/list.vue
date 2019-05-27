<template>
  <div class="list">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="time" label="时间" width="188"> </el-table-column>
      <el-table-column prop="name" label="名称" width="144"> </el-table-column>
      <!-- <el-table-column prop="type" label="类型" width="144" v-if="link == 'nav'"> </el-table-column> -->
      <el-table-column prop="state" label="状态" width="144" v-if="link == 'content'"> </el-table-column>
      <el-table-column prop="index" label="排序" width="144" v-if="link == 'content'"> </el-table-column>
      <el-table-column prop="key" label="属性名" v-if="link == 'info'" width="144"> </el-table-column>
      <!-- <el-table-column prop="use" label="发布人" width="144"> </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="UpData(scope.row._id)">修改</el-button>
          <el-button size="mini" type="danger" @click="CutOut(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      link: null,
    };
  },
  methods: {
    CutOut(id) {
      this.$emit('cutout', id);
    },
    UpData(id) {
      this.$router.push({ path: '/' + this.$route.name + '/forms', query: { id } });
    },
  },
  mounted() {
    this.link = this.$route.name;
  },
  props: {
    list: null,
  },
};
</script>
