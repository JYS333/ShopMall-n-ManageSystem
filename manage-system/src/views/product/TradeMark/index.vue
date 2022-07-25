<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0"
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
          <el-button type="warning" icon="el-icon-edit" size="mini"
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
  },
};
</script>

<style></style>
