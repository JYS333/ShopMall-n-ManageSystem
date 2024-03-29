<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      size="small"
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
        <!-- row就是对应的那一行的品牌信息 -->
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrademark(row)"
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
    <el-dialog
      :title="tmForm.id ? '修改品牌信息' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- :model 表单数据收集到哪个对象身上，&表单验证 -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" :label-width="'100px'" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="Logo" :label-width="'100px'" prop="logoUrl">
          <!-- 图片不能用v-model，因为不是表单元素 -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark"
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
      tmForm: {
        // 品牌信息表单数据
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请选择Logo上传" }],
      },
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
      let res = await this.$API.trademark.reqTrademarkList(page, limit);
      if (res.code == 200) {
        this.page = res.data.current;
        this.list = res.data.records;
        this.total = res.data.total;
      } else {
        return Promise.reject(new Error("请求品牌列表数据失败"));
      }
    },
    // handleCurrentPage(cPage) { // 将该功能集成至getPageList里了
    //   // 点击某一页时从新发送请求并显示回传
    //   this.page = cPage;
    //   this.getPageList(); // 从新获取当前页的数据
    // },
    handleSizeChange(size) {
      this.limit = size;
      this.getPageList();
    },
    // 点击添加按钮
    showAddDialog() {
      this.dialogFormVisible = true;
      // 点开时清理上次的数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 点击编辑按钮
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row }; // 利用浅拷贝将基本数据类型全部拷贝一份，不然tmForm和row指针指向同一个数据，改了row，tmForm会跟着变的，那关了弹窗的话也会看到表格里的数据跟着变了
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      let permit = (isJPG && isLt2M) || (isJPG && isLt2M);
      return permit;
    },
    // 点击确定时提交or更新数据
    addOrUpdateTrademark() {
      this.$refs.ruleForm.validate(async (valid) => {
        // async要写在最近的那层外边
        if (valid) {
          // 表单验证通过后再去提交
          this.dialogFormVisible = false;
          let res = await this.$API.trademark.reqAddOrUpdateTrademark(
            this.tmForm
          );
          if (res.code == 200) {
            this.$message({
              message: this.tmForm.id ? "修改品牌信息成功" : "添加品牌成功",
              type: "success",
            });
            // 如果添加品牌停留在第1页，如果是修改则留在当前页
            this.getPageList(this.tmForm.id ? this.page : 1); // 需要再次请求列表数据
          } else {
            return Promise.reject(
              new Error(this.tmForm.id ? "修改品牌信息失败" : "添加品牌失败")
            );
          }
        } else {
          return false;
        }
      });
    },
    // 删除当前品牌
    deleteTrademark(row) {
      this.$confirm(`确定删除『${row.tmName}』么？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
          let res = await this.$API.trademark.reqDeleteTrademark({ ...row });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            return Promise.reject(new Error("删除当前品牌数据失败"));
          }
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1); // 当前页有数据的话就留在当前页，否则回到上一页
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
