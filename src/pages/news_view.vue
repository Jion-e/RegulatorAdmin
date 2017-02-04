<template lang="html">
  <div class="container newsContainer">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/NewsList' }">新闻列表</el-breadcrumb-item>
      <el-breadcrumb-item>新闻预览</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="news">
      <div class="news__header">
        <h1 class="news__title" v-text="news.title"></h1>
        <p class="news__time-source">
          <span v-text="news.publishTime"></span>
          <span v-text="news.platform"></span>
        </p>
      </div>
      <div class="news__cont"  v-html="news.content"></div>
    </div>
    <!-- <p>
      {{news}}
    </p> -->
  </div>
</template>

<script>
import api from '../api'
import filters from '../filters'
import moment from 'moment'
export default {
  data() {
    return {
      news: {}
    };
  },
  created() {
    const id = this.$route.params.id
    api.fetchNews(id).then(data => {
      this.news = data
      this.news.publishTime = moment(this.news.publishTime).format('YYYY年MM月DD日HH:mm:ss')
      this.news.platform = filters.newsPlatformFormat(this.news.platform)
    }).catch(err => this.$message.error(err))
  },
};
</script>

<style lang="less">
.el-breadcrumb__item{font-size: 14px;}
.newsContainer{min-height: 500px;
  .news{margin-top: 20px;padding: 5px;box-shadow: 0 0 3px #20A0FF;}
  .news__header{width: 80%;margin: 0 auto;}
  .news__title{text-align: center;margin: 10px 0;}
  .news__time-source{font-size: 18px;text-align: right}
  .news__time-source span{margin-left: 10px;}
  .news__cont p{text-indent: 28px;margin-bottom: 10px;}
}
</style>
