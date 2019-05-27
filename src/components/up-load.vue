<template>
  <div>
    <el-upload
      class="upload-demo"
      action="/admin/file/upload"
      :on-success="success"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">附件上传</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'upload',
  data() {
    return {
      fileList: [],
      list: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // 删除文件成功添加数组返回到父组件
      this.$emit('handleRemove', { file: fileList });
    },
    success(file) {
      // 上传成功添加到数组返回到父组件
      this.list.push(file);
      for (let i = 0; i < this.list.length; i++) {
        const file = this.list[i].data;
        this.fileList.push(file);
      }
      this.$emit('handleRemove', { file: this.fileList });
    },
    beforeRemove(file, fileList) {
      this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  props: {
    listfile: null,
  },
  watch: {
    listfile(val) {
      // 监听辅助间传过来的文件列表  赋值给当前文件列表
      this.fileList = val;
    },
  },
};
</script>
