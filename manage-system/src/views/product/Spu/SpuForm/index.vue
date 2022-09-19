<template>
    <div>
        <el-form ref="form" label-width="80px" :model="spu">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称">
                <el-select value="" placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option v-for="(item) in tradeMarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload
                action="/dev-api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="spuImageList">
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
            dialogVisible: false,
            spu: {
                category3Id: 0,
                description: 'sssss', // 描述
                tmId: 27, // 品牌id
                spuName:'', // spu名称
                spuImageList:[],
                spuSaleAttrList: [],

            }, // 存储spu信息对象
            tradeMarkList: [], // 存储品牌信息对象
            spuImageList: [], // 存储spu图片信息
            spuSaleAttrList: [], // 存储销售平台属性
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
        async initSpuData(spuId){
            // 获取SPU信息接口
            // let spuInfo = await this.$API.spu.reqSpu(spuId);
            // if(spuInfo.code == 200){
            //     this.spu = spuInfo.data;
            // }
            // 获取品牌信息
            let brandInfo = await this.$API.spu.reqTradeMarkList();
            if(brandInfo.code == 200){
                this.tradeMarkList = brandInfo.data;
            }
            // 获取SPU图片信息
            let spuImageList = await this.$API.spu.reqSpuImageList(spuId);
            if(spuImageList.code == 200){
                let arr = spuImageList.data;
                arr.forEach(item => {
                    item.name = item.imgName;
                    item.url = item.imgUrl;
                });
                this.spuImageList = arr;
            }
            // 获取销售平台属性列表信息
            let saleList = await this.$API.spu.reqBaseSaleAttrList();
            if(saleList.code == 200){
                this.spuSaleAttrList = saleList.data;
            }
        }
    }
  }
  </script>
  
  <style>
  
  </style>