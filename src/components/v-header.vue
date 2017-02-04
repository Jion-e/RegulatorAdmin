<template lang="html">
  <header class="top-header">
    <h1 class="title">产品质量内容发布后台管理系统</h1>
    <div class="exit" v-show="isLogin">
      <span>用户：{{user.name}}</span>
      <el-button type="danger" class="exit-btn" @click.native="exit">退出</el-button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      isLogin: false
    };
  },
  mounted() {
    if(sessionStorage.isLogin === 'true'){
      this.isLogin = true
      if(localStorage.user){
        this.user = JSON.parse(localStorage.user)
      }
    }
  },
  methods: {
    exit(){
      sessionStorage.isLogin = 'false'
      this.$router.push({path: '/Login'})
    }
  }
};
</script>
