<template>
  <div class="sidebar-item-container">
    <div class="sidebar-item">
      <img class="prompt_icon" :src="item.icon" alt=" ">
      <router-link :to="item.path" class="sidebar-router">
        <span class="prompt_text">
          {{ item.title }}
        </span>
      </router-link>
      <img :name="item.name" v-if="item.children.length > 0" class="fold_icon" src="@/icons/fold.svg" alt=" " @click="unfold">
    </div>

    <div class="sub_item_container" v-if="item.children.length > 0 && !fold">
      <div class="sub_item" v-for="sub_item in item.children">
        <img class="prompt_icon" :src="sub_item.icon" alt=" ">
        <router-link :to="item.path+'/'+sub_item.path" class="sidebar-router">
          <span class="prompt_text">
            {{ sub_item.title }}
          </span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "sidebar_item",
  props: {
    item: {           // 路由项
      type: Object,
      required: true
    },
    basePath: {       // 基路由
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fold: true
    }
  },
  methods: {
    unfold() {
      let ele = document.getElementsByName(this.item.name)[0]
      if (this.fold) {
        ele.style.transform = "rotate(180deg)"
      } else {
        ele.style.transform = ""
      }
      this.fold = !this.fold
    }
  }
}
</script>

<style scoped>
.sidebar-item-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
.sidebar-item{
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: left;
  margin-left: 10%;
  height: 20px;
  width: 90%;
  margin-top: 20px;
  align-items: center;
}

.sub_item_container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;

}

.sub_item {
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: left;
  margin-left: 25%;
  height: 20px;
  width: 90%;
  margin-top: 20px;
  align-items: center;
}

.sidebar-router {
  text-decoration-line: none
}

.prompt_text {
  color: #444444;
  font-weight: bolder;
}

.prompt_text:hover {
  background-color: darkgrey;
}

.prompt_icon {
  position: relative;
  left: -5%;
  height: 80%;
}

.fold_icon {
  position: absolute;
  right: 5%;
  height: 80%;
}

</style>