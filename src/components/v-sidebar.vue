<template lang="html">
  <aside>
    <el-menu default-active="/" theme="light" router>
     <el-submenu index="1">
       <template slot="title">
         <i class="icon-screenshot"></i>质量热点
       </template>
       <el-menu-item index="/NewsList"><i class="icon-list"></i>热点新闻列表</el-menu-item>
       <el-menu-item index="/NewsAdd"><i class="icon-plus"></i>添加热点新闻</el-menu-item>
     </el-submenu>
     <el-submenu index="2">
       <template slot="title"><i class="icon-eye-open"></i>质量曝光</template>
       <el-menu-item index="/ExposureList"><i class="icon-list"></i>质量曝光列表</el-menu-item>
       <el-menu-item index="/ExposureAdd"><i class="icon-plus"></i>添加质量曝光</el-menu-item>
     </el-submenu>
     <el-submenu index="3">
       <template slot="title"><i class="icon-envelope"></i>质量投诉</template>
       <el-menu-item index="/ComplainList"><i class="icon-list"></i>质量投诉列表</el-menu-item>
     </el-submenu>
   </el-menu>
  </aside>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
