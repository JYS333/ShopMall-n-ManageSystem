<template>
  <!-- 三级联动 -->
  <div>
    <el-form size="small" inline label-width="100px" v-model="cForm">
      <el-row style="padding-top: 0; padding-bottom: 0">
        <el-form-item label="一级分类">
          <el-select
            v-model="cForm.category1Id"
            placeholder="请选择"
            @change="handle1Change"
            :disabled="show"
          >
            <!-- select必须双向绑定值，option必须绑定value值 -->
            <el-option
              v-for="c1 in list1"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="cForm.category2Id"
            placeholder="请选择"
            @change="handle2Change"
            :disabled="show"
          >
            <el-option
              v-for="c2 in list2"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            v-model="cForm.category3Id"
            placeholder="请选择"
            @change="handle3Change"
            :disabled="show"
          >
            <el-option
              v-for="c3 in list3"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      value1: "",
      list1: [], // 1级分类列表
      list2: [], // 2级分类列表
      list3: [], // 3级分类列表
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    // 获取1级分类数据
    async getCategory1List() {
      let res = await this.$API.attr.reqCategory1List();
      if (res.code == 200) {
        this.list1 = res.data;
      } else {
        return Promise.reject(new Error("获取一级分类列表失败"));
      }
    },
    // 获取2级分类数据
    async getCategory2List(Id1) {
      let res = await this.$API.attr.reqCategory2List(Id1);
      if (res.code == 200) {
        this.list2 = res.data;
      } else {
        return Promise.reject(new Error("获取二级分类列表失败"));
      }
    },
    // 获取3级分类数据
    async getCategory3List(Id2) {
      let res = await this.$API.attr.reqCategory3List(Id2);
      if (res.code == 200) {
        this.list3 = res.data;
      } else {
        return Promise.reject(new Error("获取三级分类列表失败"));
      }
    },
    handle1Change() {
      // 当1级分类value变化时，获取2级分类
      this.getCategory2List(this.cForm.category1Id);
      // 变化时清理后面两个选择框的数据
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
    },
    handle2Change() {
      // 当2级分类value变化时获取3级分类
      this.getCategory3List(this.cForm.category2Id);
      // 变化时清理最后一个选择框的数据
      this.cForm.category3Id = "";
    },
    handle3Change() {
      // 当3级分类value变化时，用emit将数据发送给父组件
      this.$emit("getCategoryId", this.cForm);
    },
  },
};
</script>

<style></style>
