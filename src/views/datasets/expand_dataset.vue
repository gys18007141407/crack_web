<template>
  <div class="dataset_container">
    <div class="control">
      <select id="control" style="width: 50%; height: 100%" v-model="choose_dataset" @change="handle_dataset">
        <option disabled value="">请选择数据集</option>
        <option v-for="item in datasets" >{{item.name}}</option>
      </select>
      <select style="width: 50%; height: 100%" v-model="dataset_type">
        <option disabled value="">请选择图片类别</option>
        <option>undefined</option>
        <option>train</option>
        <option>validation</option>
        <option>test</option>
      </select>
    </div>

    <div class="image_div">
      <img v-for="item in image_urls" :src="item[0]" class="image_label">
      <div class="upload-tag">
        <label>+<input type="file" @change="load_image" accept="image/*" multiple="multiple" hidden/> </label>
      </div>
    </div>

    <div class="image_div">
      <img v-for="item in label_urls" :src="item[0]" class="image_label">
      <div class="upload-tag">
        <label>+<input type="file" @change="load_label" accept="image/*" multiple="multiple" hidden/> </label>
      </div>
    </div>

    <button style="width: 100%; height: 10%" @click="handle_expand" >提交扩展</button>
  </div>

</template>

<script>
import {get_datasets} from "@/api/api";

export default {
  name: "expand_dataset",
  data() {
    return {
      datasets: [],
      choose_dataset: "",
      choose_index: -1,
      dataset_type: "",
      image_urls: [],
      label_urls: [],
    }
  },
  mounted() {
    this.datasets.length = 0
    let that = this
    get_datasets().then(
        res => {
          let result = res.data.result
          // 服务器返回结果
          for (let i = 0; i < result.length; i++) {
            for (let name in result[i]) {
              that.datasets.push({name: name, desc: result[i][name]})
            }
          }
        },
        err => {
          alert('无法获取数据库中创建的数据集!\n'+err)
        }
    )
  },
  methods: {
    load_image(event){
      let n = event.target.files.length
      for (let i = 0; i < n; i++) {
        let url = URL.createObjectURL(event.target.files[i]);
        this.image_urls.push([url, event.target.files[i]])
      }
    },
    load_label(event){
      let n = event.target.files.length
      for (let i = 0; i < n; i++) {
        let url = URL.createObjectURL(event.target.files[i]);
        this.label_urls.push([url, event.target.files[i]])
      }
    },
    handle_expand() {
      if (this.choose_index < 0) {
        alert("请先选择数据集!")
      } else {

      }
    }
  }
}
</script>

<style scoped>
.dataset_container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 3px;
}

.control {
  display: flex;
  flex-direction: row;
  height: 8%;
  width: 100%;
}

.image_div {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  width: 100%;
  height: 40%;
  border: 2px solid black;
  box-sizing: border-box;
  overflow: auto;
}

.image_label {
  border-width: 1px;
  border-style: dashed; border-color: gray;
  margin: 3px;
  height: 142px;
  width: 142px;
}

.upload-tag {
  display: flex;
  position: relative;
  font-size: 80px;
  color: gray;
  font-weight: lighter;
  justify-content: center;
  line-height: 142px;
  border-width: 1px;
  border-style: dashed; border-color: gray;
  margin: 3px;
  height: 142px;
  width: 142px;
}
</style>