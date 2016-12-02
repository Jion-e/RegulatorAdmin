<template lang="html">
  <div class="container">
    <div class="page-title">
      <h2>热点新闻列表</h2>
    </div>
    <div class="page-search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.keyword" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.type" placeholder="新闻分类">
            <el-option
             v-for="item in types"
             :label="item.name"
             :value="item.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchForm.category" placeholder="流行程度">
            <el-option
             v-for="item in categories"
             :label="item.name"
             :value="item.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button type="default" @click.native="searchRest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-table">
      <el-table :data="newsList" border fit stripe @selection-change="handleTableSelection" style="width:100%">
        <el-table-column type="selection" width="50"></el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="60"></el-table-column> -->
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="type" label="分类" :formatter="newsTypeFormat"></el-table-column>
        <el-table-column prop="platform" label="发布平台" :formatter="newsPlatformFormat"></el-table-column>
        <el-table-column prop="publishTime" label="发布时间" :formatter="timeFormat"></el-table-column>
        <el-table-column prop="category" label="流行程度" :formatter="newsCategoryFormat"></el-table-column>
        <el-table-column inline-template label="操作" align="center">
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
    </div>
  </div>
</template>

<script>
import api from '../api'
import filters from '../filters'
import category from '../api/category'
import { PageInit, NewsInit, newsCategories, newsTypes } from '../api/config'
import moment from 'moment'

export default {
  data() {
    return {
      searchForm: {
        keyword: '',
        type: '',
        category: '',
      },
      page: new PageInit(),
      news: new NewsInit(),
      newsList: [],
      types: newsTypes,
      categories: newsCategories
    };
  },
  computed: {},
  created(){
    //获取列表信息
    api.fetchNewsList(this.page.current - 1, this.page.size).then(data => {
      this.newsList = JSON.parse(data.data)
      this.page.total = data.total
    }).catch(err => this.$message.error(err))
  },
  methods: {
    //查询
    search() {
        //单条件查询
        // let len = 0
        // for(let key in this.searchForm){
        //   if(this.searchForm[key] !== ''){
        //     len++
        //   }
        // }
        // if(len > 1){
        //   this.$message.warning('只支持单条件查询')
        //   return false
        // }

       if(this.searchForm.keyword){
         api.fetchNewsListByKeyword(this.page.current - 1, this.page.size, this.searchForm.keyword).then(data => {
           this.newsList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }

       if(this.searchForm.type){
         api.fetchNewsListByType(this.page.current - 1, this.page.size, this.searchForm.type).then(data => {
           this.newsList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }

       if(this.searchForm.category){
         api.fetchNewsListByCategory(this.page.current - 1, this.page.size, this.searchForm.category).then(data => {
           this.newsList = JSON.parse(data.data)
           this.page.total = data.total
         }).catch(err => this.$message.error(err))
         return false
       }
     },
     //重置搜索条件
     searchRest(){
       this.searchForm.keyword = ''
       this.searchForm.type = ''
       this.searchForm.category = ''
       //获取列表信息
       api.fetchNewsList(this.page.current - 1, this.page.size).then(data => {
         this.newsList = JSON.parse(data.data)
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
      this.$router.push({path: `/NewsEdit/${row.id}`})
    },
    /**
     * 保存
     * @return {[string]}     [成功/失败]
     */
    save(){
      this.editDialog = false
      api.saveExposure(this.news).then(data => {
        this.$message.success(data)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    /**
     * 查看
     * @param  {[object]} row [此行数据]
     * @return {[dialog]}     [查看对话框]
     */
    view(row){
      this.$router.push({path: `/NewsView/${row.id}`})
    },
    /**
     * 删除
     * @param  {[object]} row [此行数据]
     * @return {[string]}     [成功/失败]
     */
    del(row){
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteNews(row.id).then(data => {
          this.$message.success(data)
          //获取列表信息
          api.fetchNewsList(this.page.current - 1, this.page.size).then(data => {
            this.newsList = JSON.parse(data.data)
            this.page.total = data.total
          }).catch(err => this.$message.error(err))
        }).catch(err => this.$message.error(err))
      })
    },
    newsTypeFormat(row){
      return filters.newsTypeFormat(row.type)
    },
    newsPlatformFormat(row){
      return filters.newsPlatformFormat(row.platform)
    },
    newsCategoryFormat(row){
      return filters.newsCategoryFormat(row.category)
    },
    timeFormat(row){
      return moment(row.publishTime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
};
</script>
