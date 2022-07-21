<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data：将来要展示的数据————数组类型 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="prop" label="Logo" width="width" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="300" align="center">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="6"
      :total="50"
      :pager-count="10"
      :page-sizes="[5, 10, 15, 20]"
      page-size="5"
      layout="prev, pager, next, jumper, ->, sizes, total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
