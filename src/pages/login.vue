<template lang="html">
  <div class="login">
    <el-card class="container">
      <h2 class="title">质量相关管理发布平台</h2>
      <el-form :model="user" :rules="loginRules" ref="loginForm" label-position="left">
        <el-form-item prop="name">
          <el-input v-model.trim="user.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="user.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="self-form-item">
          <el-checkbox v-model="remember">记住我</el-checkbox>
          <el-button type="text" class="forget" @click.native="forget">忘记密码？</el-button>
        </el-form-item>
        <el-form-item>
            <el-input v-model="code" class="code-text"></el-input>
            <img class="code-img" :src="codeImg" alt="验证码" @click="refreshCode" />
            <el-button type="text" class="code-btn" @click.native="refreshCode">看不清？</el-button>
        </el-form-item>
        <!-- <el-form-item label="输入下方的验证码" label-width="140px">
          <el-input v-model="code"></el-input>
        </el-form-item>
        <el-form-item>
          <img class="code" :src="codeImg" alt="验证码" @click="refreshCode" />
          <el-button type="text" class="refresh-btn" @click.native="refreshCode">看不清？</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click.native="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '../api'
export default {
  data() {
    return {
      remember: false,
      code: '',
      verifiyCode: '',
      codeImg: '',
      user: {
        name: '',
        password: '',
      },
      loginRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
      }
    };
  },
  created(){
    this.refreshCode()
    if(localStorage.user){
      const userCache = JSON.parse(localStorage.user)
      if(localStorage.remember === 'true'){
        this.remember = true
        this.user = userCache
      }
    }
    const vm = this
    $("body").keydown(() => {
        if (event.keyCode == "13") {
            vm.login()
        }
    })
  },
  methods: {
    login(){
      this.$refs.loginForm.validate(valid =>{
        if(valid){
          if(this.code !== this.verifiyCode){
            this.$message.error('验证码输入错误')
            this.refreshCode()
          }else{
            api.login(this.user).then(data => {
              if(data.result !== 'success'){
                this.$message.error(data.message)
                this.refreshCode()
              }else{
                sessionStorage.isLogin = 'true'
                localStorage.user = JSON.stringify(this.user)
                localStorage.remember = this.remember

                this.$router.push({ path: '/NewsList'})
              }
            }).catch(err => {
              this.$message.error(err)
              this.refreshCode()
            })
          }
        }
      })
    },
    refreshCode(){
      api.createCode().then(data => {
          data = JSON.parse(data)
          this.verifiyCode = data.code
          this.codeImg = data.path
      })
    },
    forget(){
      this.$message.warning('请向管理员求助')
    }
  }
};
</script>
