<template lang="html">
  <div class="container">
    <div class="page-title">
      <h1>质量投诉列表</h1>
    </div>
    <div class="page-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入投诉标题或产品名称或投诉人姓名" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.category" placeholder="隶属栏目">
            <el-option
             v-for="item in categories"
             :label="item.name"
             :value="item.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model.number="searchForm.type" placeholder="投诉类型">
            <el-option
             v-for="item in complainType"
             :label="item.name"
             :value="item.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button type="default" @click.native="searchReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-table">
      <el-table :data="complainList" fit border stripe @selection-change="handleTableSelection">
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="100"></el-table-column> -->
        <el-table-column prop="title" label="投诉标题" width="280"></el-table-column>
        <el-table-column prop="categoryName" label="隶属栏目" ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="130"></el-table-column>
        <!-- <el-table-column prop="idcard" label="身份证" width="200"></el-table-column> -->
        <!-- <el-table-column prop="email" label="电子邮箱" width="200"></el-table-column> -->
        <!-- <el-table-column prop="address" label="地区" width="200"></el-table-column> -->
        <el-table-column prop="type" label="投诉类型" :formatter="complainTypeFormat"></el-table-column>
          <!-- <el-table-column prop="productBrand" label="产品品牌" width="200"></el-table-column> -->
        <el-table-column prop="productDetail" label="投诉品牌"></el-table-column>
        <!-- <el-table-column prop="payTime" label="购买时间" width="200"></el-table-column> -->
        <!-- <el-table-column prop="payPrice" label="购买价格" width="200"></el-table-column> -->
        <!-- <el-table-column prop="company" label="生产厂家"></el-table-column> -->
        <!-- <el-table-column prop="companyPhone" label="厂家电话" width="200"></el-table-column> -->
        <!-- <el-table-column prop="response" label="投诉回复" width="200"></el-table-column> -->
        <el-table-column inline-template label="操作" width="150" align="center">
          <div class="btn-group">
            <el-button type="text" @click.native="edit(row)">编辑</el-button>
            <el-button type="text" @click.native="view(row)">查看</el-button>
            <el-button type="text" @click.native="del(row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="page-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="page.sizes"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
       </el-pagination>
     </div>

     <el-dialog class="dialog" title="查看" v-model="viewDialog" size="small" lock-scroll>
       <el-card class="dialog-card">
         <ul>
           <!-- <li><span>编号:</span>{{complain.id}}</li> -->
           <li>
             <span class="card-label">投诉标题:</span>
             <span class="card-input">{{complain.title}}</span>
           </li>
           <li>
             <span class="card-label">隶属栏目:</span>
             <span class="card-input">{{complain.categoryName}}</span>
           </li>
           <li>
             <span class="card-label">姓名:</span>
             <span class="card-input">{{complain.name}}</span>
           </li>
           <li>
             <span class="card-label">性别:</span>
             <span class="card-input">{{complain.sex | sexFormat}}</span>
           </li>
           <li>
             <span class="card-label">联系电话:</span>
             <span class="card-input">{{complain.phone}}</span>
           </li>
           <li>
             <span class="card-label">投诉类型:</span>
             <span class="card-input">{{complain.type | complainTypeFormat}}</span>
           </li>
           <li>
             <span class="card-label">投诉品牌:</span>
             <span class="card-input">{{complain.productDetail}}</span>
           </li>
           <!-- <li>
             <span class="card-label">生产厂家:</span><span class="card-input">{{complain.company}}</span>
           </li> -->
           <li>
             <span class="card-label">投诉内容:</span><span class="card-input">{{complain.request}}</span>
           </li>
           <li>
             <span class="card-label">取证图片:</span>
             <div class="card-img" v-for="imgSrc of complain.evidenceImg">
                 <img :src="imgSrc" alt="" class="uploaderImg"/>
             </div>
           </li>
           <li>
             <span class="card-label">期望结果:</span>
             <span class="card-input">{{complain.expect}}</span>
           </li>
         </ul>
       </el-card>
     </el-dialog>

     <el-dialog class="dialog" title="编辑" v-model="editDialog" size="small" top="20px" lock-scroll>
       <el-card class="dialog-card">
         <el-form :model="complain" label-position="left" label-width="100px">
           <!-- <el-form-item label="编号">
             <el-input v-model="complain.id"></el-input>
           </el-form-item> -->
           <el-form-item label="投诉标题">
             <el-input v-model="complain.title"></el-input>
           </el-form-item>
           <el-form-item label="隶属栏目">
             <el-select clearable v-model.number="complain.category" placeholder="隶属栏目">
               <el-option
                v-for="item in categories"
                :label="item.name"
                :value="item.id"
                @click.native="complain.categoryName = item.name">
              </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="姓名">
             <el-input v-model="complain.name"></el-input>
           </el-form-item>
          <el-form-item label="性别">
             <el-radio v-model.number="complain.sex" :label="0">男</el-radio>
             <el-radio v-model.number="complain.sex" :label="1">女</el-radio>
           </el-form-item>
            <el-form-item label="联系电话">
             <el-input v-model="complain.phone"></el-input>
           </el-form-item>
           <el-form-item label="投诉类型">
             <el-select clearable v-model.number="complain.type" placeholder="投诉类型">
               <el-option
                v-for="item in complainType"
                :label="item.name"
                :value="item.id">
              </el-option>
           </el-form-item>
           <el-form-item label="投诉品牌">
             <el-input v-model="complain.productDetail"></el-input>
           </el-form-item>
           <el-form-item label="投诉内容">
             <el-input type="textarea" v-model="complain.request" :rows="5"></el-input>
           </el-form-item>
           <el-form-item label="取证图片">
             <div id="uploader">
               <div class="btns">
                 <div id="filePicker" class="uploadInput">选择图片</div>
               </div>
               <div id="imgWrap">
                  <img :src="imgSrc" v-for="imgSrc of tempImg" class="uploaderImg" />
               </div>
             </div>
           </el-form-item>
           <el-form-item label="期望结果">
             <el-input type="textarea" v-model="complain.expect"></el-input>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click.native="save">保存</el-button>
             <el-button type="default" @click.native="editDialog = false">取消</el-button>
           </el-form-item>
           <!-- <p>
             {{complain}}
           </p> -->
         </el-form>
       </el-card>
     </el-dialog>
     <!-- <p>
       {{complainList}}
     </p> -->
  </div>
</template>

<script>
import api from '../api'
import category from '../api/category'
import { ComplainInit, PageInit, complainType, HOST } from '../api/config'
import filters from '../filters'

import WebUploader from 'webuploader/dist/webuploader.js'
export default {
  data() {
    return {
      viewDialog: false,
      editDialog: false,
      page: new PageInit(),
      categories: category.product_class1,
      complainType: complainType,
      complainList: [],
      complain: new ComplainInit(),
      searchForm: {},
      tempImg: []
    };
  },
  created() {
    //获取列表信息
    api.fetchComplainList(this.page.current - 1, this.page.size).then(data => {
      this.complainList = JSON.parse(data.data)
      this.page.total = data.total
    }).catch(err => this.$message.error(err))
  },
  mounted(){
    // this.webUploaderInit()
  },
  methods: {
     //表格全选、单选
    handleTableSelection(){
      console.log('submit!');
    },
    //分页页数
    handleSizeChange(val){
      this.page.size = parseInt(val)
      //获取列表信息
      api.fetchComplainList(this.page.current - 1, this.page.size).then(data => {
        this.complainList = JSON.parse(data.data)
        this.page.total = data.total
      }).catch(err => this.$message.error(err))
    },
    //分页当前页
    handleCurrentChange(val){
      this.page.current = parseInt(val)
      //获取列表信息
      api.fetchComplainList(this.page.current - 1, this.page.size).then(data => {
        this.complainList = JSON.parse(data.data)
        this.page.total = data.total
      }).catch(err => this.$message.error(err))
    },
    webUploaderInit(){
      const vm = this
      var uploader = WebUploader.create({
        swf: require('webuploader/dist/Uploader.swf'),
        server: `${HOST}common/upload/image`,
        pick: {
          id: '#filePicker',
          // multiple: false
        },
        auto: true,
        resize: true, //压缩
        accept: {
          title: 'Images',
          extensions: 'gif,jpg,jpeg,bmp,png',
          mimeTypes: 'image/*'
        }
      })
      // 当有文件添加进来的时候
      uploader.on('fileQueued', function(file) {
        // const $li = $('<img>')
        const $img = $('<img>')
        const $list = $("#imgWrap")

        $list.append($img)
        // 创建缩略图
        // uploader.makeThumb(file, function(error, src) {
        //   if (error) {
        //     $img.replaceWith('<span>不能预览</span>')
        //     return
        //   }
        //   $img.attr('src', src)
        // }, 150, 100)
      })
      //成功
      uploader.on( 'uploadSuccess', function( file, response ) {
        vm.$message.success('上传成功')
        // vm.news.thumbnail = response._raw  //返回图片地址
        vm.tempImg.push(response._raw) //返回图片地址
      })
    },
    //查询
    search() {
        //关键字
       if(this.searchForm.keyword){
         api.fetchComplainListByKeyword(this.page.current - 1, this.page.size, this.searchForm.keyword).then(data => {
           this.complainList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }
       //隶属栏目
       if(this.searchForm.category){
         api.fetchComplainListByCategory(this.page.current - 1, this.page.size, this.searchForm.category).then(data => {
           this.complainList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }
       //隶属投诉类型
       if(this.searchForm.type){
         api.fetchComplainListByType(this.page.current - 1, this.page.size, this.searchForm.type).then(data => {
           this.complainList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }
     },
     //重置搜索条件
     searchReset(){
       this.searchForm.keyword = ''
       this.searchForm.category = ''
       this.searchForm.type = ''
       //获取列表信息
       api.fetchComplainList(this.page.current - 1, this.page.size).then(data => {
         this.complainList = JSON.parse(data.data)
         this.page.total = data.total
       }).catch(err => this.$message.error(err))
     },
    /**
     * 编辑
     * @param  {[object]} row [此行数据]
     * @return {[string]}     [成功/失败]
     */
    edit(row){
      this.complain = Object.assign({}, row) //对象的赋值
      if(this.complain.evidenceImg){
        // this.complain.evidenceImg = JSON.parse(this.complain.evidenceImg)
        this.tempImg = JSON.parse(this.complain.evidenceImg)
      }
      this.editDialog = true
      //防止webuploader反复初始化
      if($('.webuploader-pick').length === 0){
        setTimeout(() => {
          this.webUploaderInit()
        }, 100)
      }
    },
    /**
     * 保存
     * @return {[string]}     [成功/失败]
     */
    save(){
      this.editDialog = false
      this.complain.evidenceImg = this.tempImg
      api.updateComplain(this.complain).then(data => {
        this.$message.success(data)
        //获取列表信息
        api.fetchComplainList(this.page.current - 1, this.page.size).then(data => {
          this.complainList = JSON.parse(data.data)
          this.page.total = data.total
        }).catch(err => this.$message.error(err))
      }).catch(err => this.$message.error(err))
    },
    /**
     * 查看
     * @param  {[object]} row [此行数据]
     * @return {[dialog]}     [查看对话框]
     */
    view(row){
      this.complain = Object.assign({}, row) //对象的赋值
      if(this.complain.evidenceImg){
        this.complain.evidenceImg = JSON.parse(this.complain.evidenceImg)
      }
      this.viewDialog = true
    },
    /**
     * 删除
     * @param  {[object]} row [此行数据]
     * @return {[string]}     [成功/失败]
     */
    del(row){
      const id = row.id
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteComplain(id).then(data => {
          this.$message.success(data)
          //获取列表信息
          api.fetchComplainList(this.page.current - 1, this.page.size).then(data => {
            this.complainList = JSON.parse(data.data)
            this.page.total = data.total
          }).catch(err => this.$message.error(err))
        }).catch(err => {
          this.$message.error(err)
        })
      })
    },
    complainTypeFormat(row){
      return filters.complainTypeFormat(row.type)
    },
    sexFormat(row){
      return filters.sexFormat(row.sex)
    }
  }
};
</script>
