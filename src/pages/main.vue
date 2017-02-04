<template lang="html">
  <main>
    <v-header></v-header>
    <div class="warp">
        <div class="sidebar">
          <v-sidebar></v-sidebar>
        </div>
        <div class="page">
            <router-view keep-alive></router-view>
        </div>
    </div>
  </main>
</template>

<script>
import vSidebar from '../components/v-sidebar.vue'
import vHeader from '../components/v-header.vue'
export default {
  name: 'main',
  components: {vSidebar, vHeader}
};
</script>
