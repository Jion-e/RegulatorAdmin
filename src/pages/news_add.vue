<template lang="html">
  <div class="container">
    <div class="page-title">
      <h2>添加热点新闻</h2>
    </div>
    <div class="page-form-add">
      <el-form label-position="left" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="news.title"></el-input>
        </el-form-item>
        <el-form-item label="所属行业">
          <el-select clearable v-model="news.type" placeholder="新闻分类">
            <el-option
             v-for="type in types"
             :label="type.name"
             :value="type.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布平台">
          <el-select clearable v-model="news.platform" placeholder="发布平台">
            <el-option
             v-for="platform in platforms"
             :label="platform.name"
             :value="platform.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
             v-model="news.publishTime"
             type="datetime"
             placeholder="选择日期">
           </el-date-picker>
        </el-form-item>
        <el-form-item label="流行程度">
          <el-select clearable v-model="news.category" placeholder="流行程度">
            <el-option
             v-for="category in newsCategories"
             :label="category.name"
             :value="category.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图">
          <input type="file">
        </el-form-item>
        <el-form-item label="内容编辑">
          <textarea id="editor-trigger"  style="height:400px;max-height:500px" placeholder="请输入内容">
          </textarea>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="save">保存</el-button>
          <el-button type="default" @click.native="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p>
      {{news}}
    </p>
  </div>
</template>

<script>
import api from '../api'
import { NewsInit, platforms, newsCategories, newsTypes } from '../api/config'

import wangEditor from 'wangEditor'
import moment from 'moment'
export default {
  data() {
    return {
      news: {
          'id': "",
          'title': "信用无价",
          "type": 1,
          "platform": 1,
          "publishTime": "2016-11-02 15:45:55",
          "createTime": "",
          "thumbnails": "",
          "content": "<p>sdfsf</p>",
          "category": 0,
          "is": 0
      },
      // news: new NewsInit(),
      types: newsTypes,
      newsCategories: newsCategories,
      platforms: platforms
    };
  },
  mounted() {
      this.wangEditorInit()
  },
  methods: {
    /**
     * 富文本编译器初始化
     */
    wangEditorInit(){
      const vm = this
      const editor = new wangEditor('editor-trigger')

      // editor.config.uploadImgUrl = 'http://testadmin.chinaeid.org:2002/upload'
      editor.onchange = function () {
         //获取编辑器内容
         vm.news.content = $('.wangEditor-txt').html()
      }
      editor.create()
    },
    /**
     * 保存
     * @return {[string]} [成功/失败]
     */
    save(){
      this.news.publishTime = moment(this.news.publishTime).format('YYYY-MM-DD HH:mm:ss')
      this.news.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
      api.saveNews(this.news).then(data => {
        this.$message.success(data)
        this.$router.push({path: '/NewsList'})
      }).catch(err => this.$message.error(err))
    },
    /**
     * 重置
     */
    reset(){
      this.$confirm('此操作将重置表单, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.news = new NewsInit()
        $('.wangEditor-txt').html('')
      })
    }
  },
  components: {}
};
</script>
