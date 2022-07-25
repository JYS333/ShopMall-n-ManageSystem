<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0 20px"
      @click="showAddDialog"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data：将来要展示的数据————数组类型 -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="prop" label="Logo" width="width" align="center">
        <!-- 需要用到作用插槽将img url转换为图片 -->
        <template slot-scope="{ row }">
          <img
            :src="row.logoUrl"
            alt="图片失效"
            style="width: auto; height: 80px"
        /></template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="300" align="center">
        <template slot-scope="{}">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
          当前页
          数据总条数
          每一页展示的条数
          连续页码数
          pageSize——每一页展示多少数据
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" :label-width="'100px'">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Logo" :label-width="'100px'"
          ><el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0, // 分页器第几页
      limit: 5, // 当前页数展示条数
      total: 0, // 数据总数
      list: [], // 数据
      dialogFormVisible: false, // 对话框显示隐藏
      imageUrl: "", // 上传图片url
    };
  },
  mounted() {
    this.getPageList(); // 获取列表数据
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(cPage = 1) {
      // 默认为第1页
      this.page = cPage;
      const { page, limit } = this;
      let res = await this.$API.tradeMark.reqTradeMarkList(page, limit);
      if (res.code == 200) {
        this.page = res.data.current;
        this.list = res.data.records;
        this.total = res.data.total;
      } else {
        return Promise.reject(new Error("请求品牌列表数据失败"));
      }
    },
    // handleCurrentPage(cPage) {
    //   // 点击某一页时从新发送请求并显示回传
    //   this.page = cPage;
    //   this.getPageList(); // 从新获取当前页的数据
    // },
    handleSizeChange(size) {
      this.limit = size;
      this.getPageList();
    },
    showAddDialog() {
      this.dialogFormVisible = true;
    },
    updateTradeMark() {
      this.dialogFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
