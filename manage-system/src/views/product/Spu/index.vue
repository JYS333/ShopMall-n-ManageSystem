<template>
  <div>
    <el-card style="margin:0 0 20px">
      <!-- 直接用全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"/>
    </el-card>
    <el-card>
      <!-- 这里是三个部分切换 -->
      <div>
        <!-- 展示Spu列表的 -->
        <el-button type="primary" icon="el-icon-plus" style="margin:0 0 10px">添加SPU</el-button>
        <el-table style="width:100%" border :data="records">
          <el-table-column prop="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"></el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 将来用hintButton替换 -->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加SPU"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改SPU"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前SPU的全部SKU"></hint-button>
              <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除SPU"></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :total="total"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      page: 0, // 分页器第几页
      limit: 5, // 当前页数展示条数
      total: 0, // 数据总数
      isShowTable: true, // 是否显示表格
      show: true, // 控制三级联动的可操作性
      ids: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      records:[], // Spu列表数据
    };
  },
  methods:{
    // 获取Spu列表数据
    async getSpuList(pages = 1) {
      this.page = pages;
      let res = await this.$API.spu.reqSpuList(this.page, this.limit, this.ids.category3Id);

      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      } else {
        return Promise.reject(new Error("获取当前分类的商品信息失败"));
      }
    },
    getCategoryId(data) {
      // 自定义事件回调，data是子组件给父组件传递的数据
      this.ids = { ...data };
      this.getSpuList();
    },
    // 分页器每页数目变化
    handleSizeChange(limit){
      this.limit = limit;
      this.getSpuList();
    },
  }
};
</script>

<style></style>
