<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">基于深度学习的建筑裂缝识别系统</h3>
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/username.svg" alt="">
      <input v-model="username" placeholder="username" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/[^\w_]/g,'')">
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/password.svg" alt="">
      <input v-model="password" placeholder="password" :type="password_type" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/[^\w_]/g,'')">
      <img class="eye" :src="eye_path" alt="eye" @click="click_eye">
    </div>

    <div class="login_button">
      <button @click="handle_register" style="flex: 1; margin-right: 2px">我要注册</button>
      <button @click="handle_login" style="flex: 1; margin-right: 2px; margin-left: 2px">{{ login_text }}</button>
      <button @click="" style="flex: 1;margin-left: 2px">忘记密码？</button>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/api";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      password_type: "password",
      eye_open: false,
      waiting: false,
    }
  },
  computed: {
    eye_path() {
      return this.eye_open ? require("@/icons/eye-open.svg") : require("@/icons/eye-close.svg")
    },
    login_text() {
      return this.waiting ? '正在登录' : '登录'
    }
  },
  methods: {
    handle_login() {
      let that = this
      if (this.username.length < 3) {
        alert("用户名长度必须大于等于3!")
      } else if (this.password.length < 6) {
        alert("密码长度必须大于等于6!")
      } else {
        this.waiting = true
        login({
          name: this.username,
          password: this.password
        }).then(res => {
          console.log(res.data)
          window.localStorage.setItem("crack_token", res.data.token)
          window.localStorage.setItem("crack_role", res.data.role)
          window.localStorage.setItem("crack_login", "true")
          that.$router.push({path: "/identify"});
        }, err => {
          window.alert("登录失败！\n" + err)
        }).finally(() => {
          that.waiting = false
        })
      }
    },
    handle_register() {
      this.$router.push('/register')
    },
    click_eye() {
      this.eye_open = !this.eye_open
      this.password_type = this.eye_open ? "" : "password"
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  height: 100%;
  width: 100%;
}

.title-container {
  position: relative;
  margin: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 100%;
}

.title {

}

.login_form {
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 10px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: gray;
  height: 30px;
  width: 25%;
}

.login_button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
  height: 30px;
  width: 25%;
}
.prompt_icon {
  position: absolute;
  left: 2%;
  height: 40%;
}
.eye {
  position: absolute;
  right: 2%;
  height: 40%;
}

</style>