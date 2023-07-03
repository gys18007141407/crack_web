<template>
<div class="container">
  <banner></banner>
  <div class="sidebar-and-views">
    <div class="sidebar_container">
      <sidebar ></sidebar>
    </div>
    <div class="views_container">
<!--      <keep-alive>-->
<!--        <router-view></router-view>-->
<!--      </keep-alive>-->
      <router-view  v-slot="{Component}">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
  </div>
</div>
</template>

<script>
import banner from "@/layout/banner/banner";
import sidebar from "@/layout/sidebar/sidebar";

export default {
  name: "layout",
  components: {
    'banner': banner,
    'sidebar': sidebar
  }
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
}
.sidebar-and-views {
  display: flex;
  flex-direction: row;
  height: 90%;
}
.sidebar_container {
  height: 100%;
  width: 20%;
}
.views_container {
  height: 100%;
  width: 80%;
  overflow: auto;
}
</style>