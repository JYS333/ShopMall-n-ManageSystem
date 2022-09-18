<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select value="" placeholder="请选择品牌">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="SPU描述"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select value="" placeholder="还有3个未选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-button type="primary" style="margin:0 10px">
                    <i class="el-icon-plus"></i>添加销售属性
                </el-button>
                <el-table style="width:100%; margin: 20px 0 0;" border>
                    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="spuName" label="属性名" width="width"></el-table-column>
                    <el-table-column prop="description" label="属性值名称列表" width="width"></el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template>
                        <!-- <hint-button type="success" icon="el-icon-plus" size="mini" title="添加SPU"></hint-button>
                        <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改SPU" @click="updateSpu(row, $index)"></hint-button>
                        <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前SPU的全部SKU"></hint-button> -->
                        <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除SPU"></hint-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button @click="$emit('changeScene', 0)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
  </template>
  
  <script>
  export default {
      name:'SpuForm',
      data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    mounted(){
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 发送请求初始化spu列表数据
        initSpuData(){
            console.log("faqingqiu")
        }
    }
  }
  </script>
  
  <style>
  
  </style>