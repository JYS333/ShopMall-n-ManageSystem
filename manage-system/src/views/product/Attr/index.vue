<template>
  <div>
    <!-- 第一个卡片：三级联动管理 -->
    <el-card style="margin: 0 0 20px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <!-- 第二个卡片 -->
    <el-card>
      <!-- 属性列表 及 上方button -->
      <div v-show="isShowTable">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          style="margin-bottom: 20px"
          :disabled="ids.category3Id ? false : true"
          @click="isShowTable = false"
        >
          添加属性
        </el-button>
        <!-- 表格：展示属性列表数据 -->
        <el-table :data="attrList" style="width: 100%" border>
          <!-- type:index prop:prop 序号 -->
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column>
          <!-- prop:attrName 属性名称 -->
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="300"
            align="center"
          >
          </el-table-column>
          <!-- prop:attrName 属性值列表 -->
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-tag
                v-for="(attr, index) in row.attrValueList"
                :key="index"
                style="margin-right: 10px"
              >
                {{ attr.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="300" align="center">
            <!-- row就是对应的那一行的品牌信息 -->
            <template>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="isShowTable = false"
              >
                编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :total="total"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
        >
        </el-pagination>
      </div>
      <!-- 修改属性form -->
      <div v-show="!isShowTable">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary"> 添加 </el-button>
            <el-button> 取消 </el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="attrList"
          style="width: 100%; margin-bottom: 20px"
          border
        >
          <!-- type:index prop:prop 序号 -->
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column>
          <!-- prop:attrName 属性名称 -->
          <el-table-column prop="prop" label="属性名称" width="width">
          </el-table-column>
          <!-- prop:attrName 属性值列表 -->
          <!-- <el-table-column
            prop="prop"
            label="属性值列表"
            width="width"
            align="left"
          >
            <template slot-scope="{ row }">
              <el-tag
                v-for="(attr, index) in row.attrValueList"
                :key="index"
                style="margin-right: 10px"
              >
                {{ attr.valueName }}
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column prop="prop" label="操作" width="300" align="center">
            <!-- row就是对应的那一行的品牌信息 -->
            <template>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="isShowTable = false"
              >
                编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0, // 分页器第几页
      limit: 5, // 当前页数展示条数
      total: 0, // 数据总数
      attrList: [], // 展示的列表信息
      isShowTable: false, // 是否显示表格
      ids: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  methods: {
    async getAttrList(data) {
      let res = await this.$API.attr.reqCertainCategory(data);

      if (res.code == 200) {
        this.attrList = res.data;
      } else {
        return Promise.reject(new Error("获取当前分类的商品信息失败"));
      }
    },
    getCategoryId(data) {
      // 自定义时间回调，data是子组件给父组件传递的数据
      this.ids = { ...data };
      this.getAttrList(data);
    },
  },
};
</script>

<style></style>
