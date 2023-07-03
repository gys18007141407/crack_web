<template>
<div class="dataset_container">
  <div class="control_and_dataset">
    <div class="control">
      <select id="control" style="width: 30%; height: 100%" v-model="choose_dataset" @change="handle_dataset">
        <option disabled value="">请选择数据集</option>
        <option v-for="item in datasets" >{{item.name}}</option>
      </select>
      <select style="width: 20%; height: 100%" v-model="dataset_type">
        <option disabled value="">请选择图片类别</option>
        <option>all</option>
        <option>train</option>
        <option>validation</option>
        <option>test</option>
      </select>
      <select id="control" style="width: 20%; height: 100%" v-model="display_image">
        <option disabled value="">是否显示image</option>
        <option>yes</option>
        <option>no</option>
      </select>
      <select id="control" style="width: 20%; height: 100%" v-model="display_label">
        <option disabled value="">是否显示label</option>
        <option>yes</option>
        <option>no</option>
      </select>
      <button style="width: 10%; height: 100%" @click="handle_dataset_images" >查看</button>
    </div>
    <div class="dataset">
      <div class="image_div" v-if="display_image === 'yes'">
        <img v-for="(item, index) in result" :src="item.image" alt=" " class="image_label">
      </div>
      <div class="image_div" v-if="display_label === 'yes'">
        <img v-for="(item, index) in result" :src="item.label" alt=" " class="image_label">
      </div>
    </div>

    <div class="page_control">
      <button style="width: 100%; height: 100%">翻页按钮区</button>
    </div>
  </div>

  <div class="dataset_desc">
    <div style="text-align: center" ><h3>{{name}}</h3></div>
    <h5 style="text-align: left; display: flex">{{desc}}</h5>
  </div>

</div>
</template>

<script>
import {datasets_images, get_datasets} from "@/api/api";

export default {
  name: "edit_dataset",
  data() {
    return {
      result: [],
      datasets: [],
      choose_dataset: "",
      choose_index: -1,
      dataset_type: "",
      display_image: "",
      display_label: "",
      page: 0,
      page_count: 48,
      total: 0,
      name: "数据集名称",
      desc: "这里是对于所选择数据集的相关介绍",
    }
  },
  computed: {
    image_type() {
      if (this.dataset_type === 'all') return 'undefined'
      return this.dataset_type
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
    base64ToBlob(base64) {
      let byteString = atob(base64)
      let arrayBuffer = new ArrayBuffer(byteString.length)
      let intArray = new Uint8Array(arrayBuffer)
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      return new Blob([intArray], {type: 'image'})
    },
    handle_dataset() {
      let ele = document.getElementById('control')
      // let options = ele.children
      this.choose_index = ele.selectedIndex - 1
      this.name = this.datasets[this.choose_index].name
      this.desc = this.datasets[this.choose_index].desc
    },
    handle_dataset_images() {
      if (this.choose_index < 0) {
        alert("请先选择数据集!")
      }
      else if (this.dataset_type.length === 0) {
        alert("至少需要显示image和label的其中一类!")
      }
      else if (this.display_image !== 'yes' && this.display_label !== 'yes') {
        alert("至少需要显示image和label的其中一类!")
      } else {
        this.page = 0
        this.total = 0
        let that = this
        datasets_images({
          'datasets': this.choose_dataset,
          'type': this.image_type,
          'from': 0,
          'count': this.page_count
        }).then(
            res => {
              let result = res.data.result
              that.total = res.data.total
              if (that.total === 0) {
                alert("数据库中暂时不包含该类条件的图片!")
              } else {
                for (let i = 0; i < result.length; i++) {
                  let img_blob = that.base64ToBlob(result[i].image)
                  let img_url = window.URL.createObjectURL(img_blob)
                  let label_blob = that.base64ToBlob(result[i].label)
                  let label_url = window.URL.createObjectURL(label_blob)
                  that.result.push({name: result[i].name, image: img_url, label: label_url})
                }
                that.page = 1
              }
            },
            err => {
              alert("获取图片失败！\n" + err)
            }
        )
      }

    }

  }
}
</script>

<style scoped>
.dataset_container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.control_and_dataset {
  display: flex;
  flex-direction: column;
  margin: 3px;
  height: 100%;
  width: 70%;
}
.control {
  display: flex;
  flex-direction: row;
  height: 8%;
  width: 100%;
}
.dataset {
  height: 82%;
  width: 100%;
  border-right: 1px solid grey;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  overflow: auto;
}

.image_div {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  width: 100%;
}
.image_label {
  height: 50px;
  width: 50px;
  margin: 3px;
}
.page_control {
  height: 10%;
  width: 100%;
}
.dataset_desc {
  margin: 3px;
  height: 100%;
  width: 30%;
}
</style>