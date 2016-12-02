<template lang="html">
  <div class="container">
    <div class="page-title">
      <h2>添加质量曝光</h2>
    </div>
    <div class="page-form-add">
      <el-form :model="exposure" ref="exposure" label-position="left" label-width="100px">
        <el-form-item label="所属行业">
          <el-select clearable v-model.number="exposure.productClass1" placeholder="所属行业" @change="HandleCategoryChange">
            <el-option
             v-for="item in product_class1"
             :label="item.name"
             :value="item.id"
             @click.native="exposure.productClass1Name = item.name">
           </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="细分行业">
          <el-select clearable v-model.number="exposure.productClass2" placeholder="细分行业">
            <el-option
             v-for="item in product_class2"
             :label="item.name"
             :value="item.id"
             @click.native="exposure.productClass2Name = item.name">
           </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="企业名称">
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
        </el-form-item> -->
        <!-- <el-form-item label="上传Excel">
          <input type="file" id="excelFile">
        </el-form-item> -->
        <el-form-item label="上传Excel">
          <div id="uploader" class="wu-example">
            <div id="thelist" class="uploader-list"></div>
            <div class="btns">
              <div id="picker">选择文件</div>
              <button id="ctlBtn" class="el-button el-button--default">开始上传</button>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="save">保存</el-button>
          <el-button type="default" @click.native="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="exposureList-show" v-show="isShow">
        <h3 class="title">Excel文件内容</h3>
        <el-table :data="exposureList" border fit stripe style="width: 95%">
          <el-table-column prop="companyName" label="企业名称" width="250"></el-table-column>
          <el-table-column prop="location" label="企业所在地" width="110"></el-table-column>
          <el-table-column prop="productName" label="产品名称"  width="200"></el-table-column>
          <el-table-column prop="brand" label="商标" width="80"></el-table-column>
          <el-table-column prop="model" label="规格型号"  width="200"></el-table-column>
          <el-table-column prop="batch" label="生产日期/批号" width="200"></el-table-column>
          <el-table-column prop="result" label="抽查结果" width="100"></el-table-column>
          <el-table-column prop="reason" label="不合格项目" width="200"></el-table-column>
          <el-table-column prop="accreditationBody" label="承建机构"  width="250"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import category from '../api/category'
import { exposureInit } from '../api/config'
import moment from 'moment'
import 'webuploader/dist/webuploader.css'
import WebUploader from 'webuploader/dist/webuploader.js'
export default {
  data() {
    return {
      isShow: false,
      exposure: new exposureInit(), //创建曝光实例
      exposureList: [],
      product_class1: category.product_class1,
      product_class2: [],
    };
  },
  mounted(){
    const vm = this
    var uploader = WebUploader.create({
        swf: require('webuploader/dist/Uploader.swf'),
        // swf: 'webuploader/dist/Uploader.swf',
        server: 'http://localhost:8080/regulator/exposure/upload/excel',
        pick: {
          id: '#picker',
          innerHTML: '选择Excel文件',
          multiple: false
        },
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        accept: {
          title: 'Excel',
          extensions: 'xls',
          mimeTypes: 'application/vnd.ms-excel'
        }
      })
    // 当有文件被添加进队列的时候
    uploader.on('fileQueued', function(file) {
      var $list = $('#thelist')
      $list.append('<div id="' + file.id + '" class="item">' +
        '<h4 class="info">' + file.name + '</h4>' +
        '<p class="state">等待上传...</p>' +
        '</div>');
    })

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function(file, percentage) {
      var $li = $('#' + file.id),
          $percent = $li.find('.progress .progress-bar');

      // 避免重复创建
      if (!$percent.length) {
        $percent = $('<div class="progress progress-striped active">' +
          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
          '</div>' +
          '</div>').appendTo($li).find('.progress-bar');
      }

      $li.find('p.state').text('上传中');
      $percent.css('width', percentage * 100 + '%');
    })

    uploader.on('uploadSuccess', function(file, response ) {
      $('#' + file.id).find('p.state').text('已上传');
      vm.$message.success('上传成功')
      response.forEach(item => {
        vm.exposureList.push(item)
      })
      vm.isShow = true
    });

    uploader.on('uploadError', function(file) {
      $('#' + file.id).find('p.state').text('上传出错');
    });

    uploader.on('uploadComplete', function(file) {
      $('#' + file.id).find('.progress').fadeOut();
    });

    $('#ctlBtn').click(function(e) {
      uploader.upload();
      e.preventDefault();
    });
  },
  methods: {
    /**
     * 所属行业变化
     * @param {[number]} val [下拉选项值]
     */
    HandleCategoryChange(val){
      this.exposure.productClass2 = ''
      this.exposure.productClass2Name = ''
      if(val){
        this.product_class2 = category.product_class1.filter(item => item.id === val)[0].product_class2
      }
    },
    /**
     * 保存曝光信息
     * @return {[string]} [成功/失败]
     */
    save(){
      if(!(this.exposure.productClass1 && this.exposure.productClass2)){
        this.$notify.error({
          title: '错误',
          message: '请选择行业'
        })
        return false
      }
      this.exposureList.forEach(item => {
        item.createTIme = moment().format('YYYY-MM-DD HH:mm:ss')
        item.is = 0
        item.productClass1 = this.exposure.productClass1
        item.productClass2 = this.exposure.productClass2
        item.productClass1Name = this.exposure.productClass1Name
        item.productClass2Name = this.exposure.productClass2Name
      })
      api.saveExposure(this.exposureList).then(data => {
        this.$message.success(data)
        this.$router.push({path: '/ExposureList'})
      }).catch(err => this.$message.error(err))
    },
    /**
     * 重置表单
     */
    reset(){
      this.$confirm('此操作将重置表单, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exposure = new exposureInit()
      })
    }
  },
  components: {}
};
</script>
