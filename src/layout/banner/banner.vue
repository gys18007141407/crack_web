<template>
 <div class="banner-container">
   <div class="system-title">
     欢迎使用建筑裂缝识别系统
   </div>
   <div class="info" @click="logout">
     退出登录
   </div>
 </div>
</template>

<script>
export default {
  name: "banner",
  methods: {
    logout() {
      window.localStorage.removeItem("crack_token")
      window.localStorage.removeItem("crack_role")
      window.localStorage.removeItem("crack_login")
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.banner-container {
  top: 0;
  height: 10%;
  width: 100%;
  background-color: lightslategrey;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.system-title {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  height: 100%;
  width: 100%;
}
.info {
  position: absolute;
  right: 0;
  bottom: -65%;
  font-size: 12px;
  color: red;
  height: 100%;
  width: 10%;
}
</style>