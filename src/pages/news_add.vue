<template lang="html">
  <div class="container">
    <div class="page-title">
      <h2>添加热点新闻</h2>
    </div>
    <div class="page-form-add">
      <el-form :model="news" :rules="newsRules" ref="newsForm" label-position="left" label-width="100px" >
        <el-form-item label="标题" prop="title">
          <el-input v-model="news.title" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" prop="type">
          <el-select clearable v-model="news.type" placeholder="新闻分类">
            <el-option
             v-for="type in types"
             :label="type.name"
             :value="type.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布平台" prop="platform">
          <el-select clearable v-model="news.platform" placeholder="发布平台">
            <el-option
             v-for="platform in platforms"
             :label="platform.name"
             :value="platform.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker
             v-model="news.publishTime"
             type="datetime"
             placeholder="选择日期">
           </el-date-picker>
        </el-form-item>
        <el-form-item label="流行程度" prop="category">
          <el-select clearable v-model="news.category" placeholder="流行程度">
            <el-option
             v-for="category in newsCategories"
             :label="category.name"
             :value="category.id">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缩略图" prop="thumbnail">
          <div id="uploader">
            <div class="btns">
              <div id="filePicker" class="uploadInput">选择图片</div>
            </div>
            <div id="imgWrap"></div>
          </div>
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
    <!-- <p>
      {{news}}
    </p> -->
  </div>
</template>

<script>
import api from '../api'
import { NewsInit, platforms, newsCategories, newsTypes, HOST } from '../api/config'

import WebUploader from 'webuploader/dist/webuploader.js'
import wangEditor from 'wangEditor'
import moment from 'moment'
export default {
  data() {
    return {
      news: new NewsInit(),
      types: newsTypes,
      newsCategories: newsCategories,
      platforms: platforms,
      newsRules: {
        title: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ],
        type: [
          { type: 'number', required: true, message: '新闻分类不能为空', trigger: 'change'},
        ],
        platform: [
          { type: 'number', message: '新闻平台不能为空', trigger: 'change'},
        ],
        category: [
          { type: 'number', message: '新闻流行程度不能为空', trigger: 'change'},
        ],
        publishTime: [
          { type: 'date', required: true, message: '新闻发布时间不能为空', trigger: 'change'  },
        ],
        thumbnail:  [
          { required: true, message: '新闻缩略图不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  mounted() {
      this.wangEditorInit()
      this.webUploaderInit()
  },
  methods: {
    /**
     * 富文本编译器初始化
     */
    wangEditorInit(){
      const vm = this
      const editor = new wangEditor('editor-trigger')

      editor.config.uploadImgUrl = `${HOST}common/upload/image`
      editor.onchange = function () {
         //获取编辑器内容
         vm.news.content = $('.wangEditor-txt').html()
      }
      editor.create()
    },
    webUploaderInit(){
      const vm = this
      let uploader = WebUploader.create({
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
      //点击上传
      // $('#uploadBtn').click(function(e){
      //    uploader.upload()
      //    e.preventDefault()
      //  })
    },
    /**
     * 保存
     * @return {[string]} [成功/失败]
     */
    save(){
      const vm = this
      this.$refs.newsForm.validate((valid) => {
        if (valid) {
          vm.news.publishTime = moment(this.news.publishTime).format('YYYY-MM-DD HH:mm:ss')
          vm.news.createTime = moment().format('YYYY-MM-DD HH:mm:ss')
          api.saveNews(this.news).then(data => {
            vm.$message.success(data)
            vm.$router.push({path: '/NewsList'})
          }).catch(err => this.$message.error(err))
        }else{
          vm.$message.warning('新闻信息填写不全')
          window.scrollTo(0, 0)
        }
      })
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
        $('#imgWrap').children().remove()
      })
    }
  },
  components: {}
};
</script>
