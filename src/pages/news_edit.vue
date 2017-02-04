<template lang="html">
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/NewsList' }">新闻列表</el-breadcrumb-item>
      <el-breadcrumb-item>新闻编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="page-title">
      <h2>编辑热点新闻</h2>
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
             :value="type.id"
             @click.native="news.typeName = type.name">
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
          <div id="uploader">
            <div class="btns">
              <div id="filePicker" class="uploadInput">选择图片</div>
            </div>
            <div id="imgWrap"></div>
          </div>
        </el-form-item>
        <el-form-item label="内容编辑">
          <textarea id="editor-trigger"  style="height:400px;max-height:500px">
          </textarea>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="update">保存</el-button>
          <el-button type="default" @click.native="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <p>
      {{news}}
    </p> -->
  </div>
</template>

<script>
import api from '../api'
import { NewsInit, platforms, newsCategories, newsTypes, HOST } from '../api/config'

import wangEditor from 'wangEditor'
import WebUploader from 'webuploader/dist/webuploader.js'
import moment from 'moment'
export default {
  data() {
    return {
      news: new NewsInit(),
      types: newsTypes,
      newsCategories: newsCategories,
      platforms: platforms
    };
  },
  created(){
    const id = this.$route.params.id
    api.fetchNews(id).then(data => {
      this.news = data
      if(this.news.thumbnail){
        $('#imgWrap').append('<img src=' + this.news.thumbnail + ' width="150">')
      }
    }).catch(err => this.$message.error(err))
  },
  mounted() {
      this.wangEditorInit()
      this.webUploaderInit()
      setTimeout(() => {
        $('.wangEditor-txt').html(this.news.content)
      }, 300)
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
    webUploaderInit(){
      const vm = this
      var uploader = WebUploader.create({
        swf: require('webuploader/dist/Uploader.swf'),
        server: `${HOST}common/upload/image`,
        pick: {
          id: '#filePicker',
          multiple: false
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
        const $li = $('<div id="' + file.id + '" class="file-item thumbnail">' + '<img>' +          '<div class="info">' + file.name + '</div>' + '</div>')
        const $img = $li.find('img')
        const $list = $("#imgWrap")

        $list.html($li)
        // 创建缩略图
        uploader.makeThumb(file, function(error, src) {
          if (error) {
            $img.replaceWith('<span>不能预览</span>')
            return
          }
          $img.attr('src', src)
        }, 150, 100)
      })
      //成功
      uploader.on( 'uploadSuccess', function( file, response ) {
        vm.$message.success('上传成功')
        vm.news.thumbnail = response._raw  //返回图片地址
      })
    },
    /**
     * 保存
     * @return {[string]} [成功/失败]
     */
    update(){
      this.news.publishTime = moment(this.news.publishTime).format('YYYY-MM-DD HH:mm:ss')
      this.news.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
      api.updateNews(this.news).then(data => {
        this.$message.success(data)
        this.$router.push({path: '/NewsList'})
      }).catch(err => this.$message.error(err))
    },
    /**
     * 取消
     */
    cancel(){
      this.$confirm('确定取消修改?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({path: '/NewsList'})
      })
    }
  },
  components: {}
};
</script>
