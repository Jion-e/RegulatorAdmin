<template lang="html">
  <div class="container">
    <div class="page-title">
      <h2>质量曝光列表</h2>
    </div>
    <div class="page-search">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入公司名称或产品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.productClass1" placeholder="所属行业" @change="HandleCategoryChange1">
            <el-option
             v-for="item in product_class1_data"
             :label="item.name"
             :value="item.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.productClass2" placeholder="细分行业">
            <el-option
             v-for="item in product_class2_data"
             :label="item.name"
             :value="item.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="default" @click.native="searchRest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-table">
      <el-table :data="exposureList" border fit stripe style="width: 100%"
        @selection-change="handleTableSelection">
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="60"></el-table-column> -->
        <el-table-column prop="companyName" label="企业名称"></el-table-column>
        <el-table-column prop="location" label="企业所在地"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="productClass1Name" label="所属行业"></el-table-column>
        <el-table-column prop="batch" label="生产日期/批号"></el-table-column>
        <el-table-column prop="reason" label="不合格项目"></el-table-column>
        <el-table-column prop="accreditationBody" label="承建机构"></el-table-column>
        <el-table-column inline-template label="操作" align="center" width="150">
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
      <p>
        {{exposureList}}
      </p>
    </div>
    <el-dialog class="dialog" title="查看" v-model="viewDialog" size="small" lock-scroll>
      <el-card class="dialog-card">
        <ul>
          <!-- <li><span>编号:</span>{{exposure.id}}</li> -->
          <li>
            <span class="card-label">企业名称:</span>
            <span class="card-input">{{exposure.companyName}}</span>
          </li>
          <li>
            <span class="card-label">企业所在地:</span>
            <span class="card-input">{{exposure.location}}</span>
          </li>
          <li>
            <span class="card-label">产品名称:</span>
            <span class="card-input">{{exposure.productName}}</span>
          </li>
          <li>
            <span class="card-label">商标:</span>
            <span class="card-input">{{exposure.brand}}</span>
          </li>
          <li>
            <span class="card-label">所属行业:</span>
            <span class="card-input">{{exposure.productClass1Name}}</span>
          </li>
          <li>
            <span class="card-label">细分行业:</span>
            <span class="card-input">{{exposure.productClass2Name}}</span>
          </li>
          <li>
            <span class="card-label">规格型号:</span>
            <span class="card-input">{{exposure.model}}</span>
          </li>
          <li>
            <span class="card-label">抽查结果:</span>
            <span class="card-input">{{exposure.result}}</span>
          </li>
          <li>
            <span class="card-label">不合格项目:</span>
            <span class="card-input">{{exposure.reason}}</span>
          </li>
          <li>
            <span class="card-label">承建机构:</span>
            <span class="card-input">{{exposure.accreditationBody}}</span>
          </li>
        </ul>
      </el-card>
    </el-dialog>
    <el-dialog class="dialog" title="编辑" v-model="editDialog" size="small" top="20px" lock-scroll>
      <el-card class="dialog-card">
        <el-form :model="exposure" label-position="left" label-width="100px">
          <!-- <el-form-item label="编号">
            <el-input v-model="exposure.id"></el-input>
          </el-form-item> -->
          <el-form-item label="企业名称">
            <el-input v-model="exposure.companyName"></el-input>
          </el-form-item>
          <el-form-item label="企业所在地">
            <el-input v-model="exposure.location"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-input v-model="exposure.productName"></el-input>
          </el-form-item>
          <el-form-item label="商标">
            <el-input v-model="exposure.brand"></el-input>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-select clearable v-model.number="exposure.productClass1" placeholder="所属行业" @change="HandleCategoryChange2">
              <el-option
               v-for="item in product_class1_data"
               :label="item.name"
               :value="item.id"
               @click.native="exposure.productClass1Name = item.name">
             </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="细分行业">
            <el-select clearable v-model.number="exposure.productClass2" placeholder="细分行业">
              <el-option
               v-for="item in product_class2_data"
               :label="item.name"
               :value="item.id"
               @click.native="exposure.productClass2Name = item.name">
             </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格型号">
            <el-input v-model="exposure.model"></el-input>
          </el-form-item>
          <el-form-item label="抽查结果">
            <el-input v-model="exposure.result"></el-input>
          </el-form-item>
          <el-form-item label="不合格项目">
            <el-input v-model="exposure.reason"></el-input>
          </el-form-item>
          <el-form-item label="承建机构">
            <el-input v-model="exposure.accreditationBody"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="update">保存</el-button>
            <el-button type="default" @click.native="editDialog = false">取消</el-button>
          </el-form-item>
          <p>
            {{exposure}}
          </p>
        </el-form>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api'
import category from '../api/category'
import { exposureInit, PageInit } from '../api/config'

export default {
  data() {
    return {
      viewDialog: false,
      editDialog: false,
      searchForm: {
        keyword: '',
        productClass1: '',
        productClass2: ''
      },
      page: new PageInit(),
      product_class1_data: category.product_class1,
      product_class2_data: [],
      exposure: {},
      exposureList: []
    };
  },
  computed: {},
  created(){
    //获取列表信息
    api.fetchExposureList(this.page.current - 1, this.page.size).then(data => {
      this.exposureList = JSON.parse(data.data)
      this.page.total = data.total
    }).catch(err => this.$message.error(err))
  },
  methods: {
    /**
     * 所属行业变化-搜索框
     * @param {[number]} val [下拉选项值]
     */
    HandleCategoryChange1(val){
      this.searchForm.product_class2 = ''
      if(val){
        this.product_class2_data = category.product_class1.filter(item => item.id === val)[0].product_class2
      }
    },
    /**
     * 所属行业变化-编辑框
     * @param {[number]} val [下拉选项值]
     */
    HandleCategoryChange2(val){
      this.exposure.productClass2 = ''
      this.exposure.productClass2Name = ''
      if(val){
        this.product_class2_data = category.product_class1.filter(item => item.id === val)[0].product_class2
      }
    },
    //查询
    search() {
       //关键字查询
       if(this.searchForm.keyword){
         api.fetchExposureListByKeyword(this.page.current - 1, this.page.size, this.searchForm.keyword).then(data => {
           this.exposureList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }

       //所属行业查询
       if(this.searchForm.productClass1){
         if(!this.searchForm.productClass2){
           this.searchForm.productClass2 = 0
         }
         api.fetchExposureListByProductClass(this.page.current - 1, this.page.size, this.searchForm.productClass1, this.searchForm.productClass2).then(data => {
           this.exposureList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }
     },
     //重置搜索条件
     searchRest(){
       this.searchForm.keyword = ''
       this.searchForm.productClass1 = ''
       this.searchForm.productClass2 = ''
       //获取列表信息
       api.fetchExposureList(this.page.current - 1, this.page.size).then(data => {
         this.exposureList = JSON.parse(data.data)
         this.page.total = data.total
       }).catch(err => this.$message.error(err))
     },
     //表格全选、单选
    handleTableSelection(){
      console.log('submit!');
    },
    //分页页数
    handleSizeChange(val){
      this.page.size = parseInt(val)
    },
    //分页当前页
    handleCurrentChange(val){
      this.page.current = parseInt(val)
    },
    /**
     * 编辑
     * @param  {[object]} row [此行数据]
     * @return {[string]}     [成功/失败]
     */
    edit(row){
      this.product_class2_data = category.product_class1.filter(item => item.id === row.productClass1)[0].product_class2
      this.exposure = Object.assign({}, row) //对象的赋值
      this.editDialog = true
    },
    /**
     * 更新
     * @return {[string]}     [成功/失败]
     */
    update(){
      this.editDialog = false
      //获取列表信息
      api.fetchExposureList(this.page.current - 1, this.page.size).then(data => {
        this.exposureList = JSON.parse(data.data)
        this.page.total = data.total
      }).catch(err => this.$message.error(err))
    },
    /**
     * 查看
     * @param  {[object]} row [此行数据]
     * @return {[dialog]}     [查看对话框]
     */
    view(row){
      this.exposure = row
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
        api.deleteExposure(id).then(data => {
          this.$message.success(data)
          //获取列表信息
          api.fetchExposureList(this.page.current - 1, this.page.size).then(data => {
            this.exposureList = JSON.parse(data.data)
            this.page.total = data.total
          }).catch(err => this.$message.error(err))
        }).catch(err => {
          this.$message.error(err)
        })
      })
    }
  },
};
</script>
