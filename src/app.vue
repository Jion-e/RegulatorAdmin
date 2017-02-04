<template>
  <div id="app">
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
import vSidebar from './components/v-sidebar.vue'
import vHeader from './components/v-header.vue'
  export default {
    name: 'app',
    components: {
      vHeader,
      vSidebar
    }
  };
</script>
