<template>
  <div>
    <!-- 第一个卡片：三级联动管理 -->
    <el-card style="margin: 0 0 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"/>
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
          @click="addAttr"
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
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editCurrentVal(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteCurrentVal(row)"
              ></el-button>
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
        <el-form inline :model="attrInfo">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-plus"
              type="primary"
              @click="addAttrValue"
              :disabled="attrInfo.attrName == '' ? true : false"
            >
              添加
            </el-button>
            <!-- <el-button> 取消 </el-button> -->
          </el-form-item>
        </el-form>
        <el-table
          :data="attrInfo.attrValueList"
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
            <template slot-scope="{ row, $index }">
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                size="mini"
                @blur="toSpan(row)"
                @keyup.native.enter="toSpan(row)"
                :ref="$index"
                v-if="row.showInput"
              ></el-input>
              <span v-else @click="toInput(row, $index)" style="display: block">
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="300" align="center">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认删除当前小属性标签  -->
                <el-popconfirm :title="`确定删除『${row.valueName}』吗？`" @onConfirm="deleteCurrentVal($index)">
                  <el-button 
                  slot="reference" 
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  >
                    删除
                  </el-button>
                </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttrInfo" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { type } from "os";
export default {
  data() {
    return {
      page: 0, // 分页器第几页
      limit: 5, // 当前页数展示条数
      total: 0, // 数据总数
      attrList: [], // 展示的列表信息
      isShowTable: true, // 是否显示表格
      ids: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 收集新增，修改属性
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0, // 三级分类id
        categoryLevel: 3,
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
    // 切换为添加属性页面，为当前三级分类属性新增大属性
    addAttr() {
      // 在点击添加的时候清空列表数据
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.ids.category3Id, // 三级分类id
        categoryLevel: 3,
      };
    },
    // 为当前三级分类属性添加新的小属性
    addAttrValue() {
      // attrId: 是添加的对应的属性的id，目前是添加属性操作，还没有响应属性的id，所以带给服务器的id为undefined
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, // 相应的属性名的id
        valueName: "",
        showInput: true, // 给每个属性都加上，用来分别控制添加属性时输入框focus和blur时显示哪个
      });
      // 同样用$nextTick获取input组件并聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      })
    },
    // 编辑当前属性
    editCurrentVal(value) {
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo，用来展示
      this.attrInfo = cloneDeep(value); // value => row 对象，这次要用深拷贝解决嵌套引用类型的对象复制

      this.attrInfo.attrValueList.forEach(item => {
        // 因为Vue无法探测到普通的新增的属性，所以不能写item.showInput=false，所以要用$set设置响应式属性，$set必须用于响应式对象上
        this.$set(item, 'showInput', false);
      }) 
    },
    // 删除当前数据
    deleteCurrentVal(index) {
      this.attrInfo.attrValueList.splice(index, 1); 
    },
    // 切换为查看模式 imput => span
    toSpan(row) {
      if (row.valueName.trim() == "") {
        this.$message("不能传入空属性");
        return;
      }
      let isRepeat =  this.attrInfo.attrValueList.some((data)=> {
        if(row != data){
          if(row.valueName == data.valueName) return true;// 除自身外有相等的时候即重复
        }
      })
      if(isRepeat){
        this.$message("当前属性已重复");
        return; 
      }
      // 只有在有光标时才会执行
      row.showInput = false;
    },
    // 切换为编辑模式 span => input
    toInput(row, index) {
      row.showInput = true;
      // this.$refs[index] 不行 因为vue会等函数体全部执行完后再去渲染，因此不能直接在同步中获取到input组件
      // nextTick会在所有节点渲染完毕后执行一次 因此保证能拿到input组件 
      this.$nextTick(() => {
        this.$refs[index].focus();
      })
    },
    // 点击保存时将新的列表属性上传至服务器
    async addOrUpdateAttrInfo(){
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item) => {
        if(item.valueName != ''){
          delete item.showInput;
          return true;
        }
      });
      try {
        await this.$API.attr.reqAddOrUpdateAttrInfo(this.attrInfo);
        this.$message({type: 'success', message:"保存成功"});
        this.isShowTable = true;
      } catch (error) {
      }
    },
  },
};
</script>

<style></style>
