<template>
  <div class="register-container">
    <div class="title-container">
      <h3 class="title">基于深度学习的建筑裂缝识别系统</h3>
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/username.svg" alt="">
      <input required v-model="username" placeholder="username" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/[^\w_]/g,'')">
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/password.svg" alt="">
      <input required v-model="password" placeholder="password" :type="password1_type" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/[^\w_]/g,'')">
      <img class="eye" :src="eye1_path" alt="eye" @click="click_eye1">
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/phone.svg" alt="">
      <input required v-model="phone" placeholder="phone number" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/\D/g,'')">
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/pass_code.svg" alt="">
      <input required v-model="verify_code" placeholder="verify code"  style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/\D/g,'')">
      <span class="obtain" id="obtain" @click="handle_code"> {{code_desc}}</span>
    </div>
    <div class="login_form">
      <img class="prompt_icon" src="@/icons/role.svg" alt="">
      <select v-model="role" style="width: 80%; border: none">
        <option disabled value="">请选择注册的角色</option>
        <option>user</option>
        <option>admin</option>
      </select>
    </div>

    <div class="login_form" v-if="role === 'admin'">
      <img class="prompt_icon" src="@/icons/username.svg" alt="">
      <input v-model="admin_username" placeholder="authorized admin username" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/[^\w_]/g,'')">
    </div>
    <div class="login_form" v-if="role === 'admin'">
      <img class="prompt_icon" src="@/icons/password.svg" alt="">
      <input v-model="admin_password" placeholder="authorized admin password" :type="password2_type" style="width: 80%; border: none;"
             maxlength="24" oninput="value=value.replace(/[^\w_]/g,'')">
      <img class="eye" :src="eye2_path" alt="eye" @click="click_eye2">
    </div>
    <div class="login_button">
      <button @click="handle_submit" style="flex: 1">注册</button>
    </div>
    <div class="login_button">
      <button @click="handle_back" style="flex: 1">返回登录</button>
    </div>
  </div>
</template>

<script>
import {register} from "@/api/api";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      verify_code: "",
      code_cd: 0,
      password1_type: "password",
      password2_type: "password",
      eye1_open: false,
      eye2_open: false,
      role: "",
      admin_username: "",
      admin_password: "",
    }
  },
  computed: {
    eye1_path() {
      return this.eye1_open ? require("@/icons/eye-open.svg") : require("@/icons/eye-close.svg")
    },
    eye2_path() {
      return this.eye2_open ? require("@/icons/eye-open.svg") : require("@/icons/eye-close.svg")
    },
    code_desc() {
      return this.code_cd === 0 ? '获取' : this.code_cd
    }
  },
  methods: {
    handle_submit() {
      let that = this
      register({
        name: this.username,
        password: this.password,
        phone: this.phone,
        verify_code: this.verify_code,
        role: this.role,
        authorized_name: this.admin_username,
        authorized_password: this.admin_password
      }).then(
          res => {
            alert('注册成功，请重新登录！')
            that.$router.replace('/login')
          },
          err => {
            alert('注册失败！\n'+err.data)
          }
      )
    },
    handle_back() {
      this.$router.replace('/login')
    },
    handle_code() {
      // 以下放在请求验证码后的响应回调里面
      this.code_cd = 120
      let ele = document.getElementById('obtain')
      ele.style.pointerEvents = 'none'
      let timer_id = setInterval((that) => {
        that.code_cd -= 1
        if (that.code_cd === 0) {
          clearInterval(timer_id);
          ele.style.pointerEvents = 'auto'
        }
      }, 1000, this)
    },
    click_eye1() {
      this.eye1_open = !this.eye1_open
      this.password1_type = this.eye1_open ? "" : "password"
    },
    click_eye2() {
      this.eye2_open = !this.eye2_open
      this.password2_type = this.eye2_open ? "" : "password"
    },
  }
}
</script>

<style scoped>
.register-container {
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
.obtain {
  position: absolute;
  right: 2%;
  height: 40%;
  font-size: 50%;
}

.obtain:hover {
  cursor: default;
  font-weight: bolder;
}

</style>