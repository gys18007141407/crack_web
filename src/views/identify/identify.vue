<template>
  <div class="crack-container">
    <div v-if="urls.length > 0" class="control_div">
      <select style="flex: 1" v-model="choose_model">
        <option disabled value="">请选择模型</option>
        <option v-for="item in servers">{{item.model}}  {{item.ip}}</option>
      </select>
      <input v-model="threshold" placeholder="分割阈值" style="width: 34%;height: 83%; text-align: center; flex: 1" oninput="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"/>
      <button @click="handle_identify" :disabled="waiting" style="width: 34%;height: 100%; text-align: center;flex: 1" >{{identify_desc}}</button>
    </div>

    <div class="upload-container">
      <div class="upload-area" v-for="(url, index) in urls">
        <crack-canvas :url="url[0]" :type="url[1]" :name="files[index].name"></crack-canvas>
      </div>
      <!--   加号   -->
      <div class="upload-tag">
        <label>+<input type="file" @change="loadFile" accept="image/*,video/*" multiple="multiple" hidden/> </label>
      </div>
    </div>

    <div class="upload-container">
      <div class="upload-area" v-for="(url, index) in results">
        <crack-canvas :url="url[0]" :type="url[1]" :name="files[index].name"></crack-canvas>
      </div>
    </div>

  </div>
</template>

<script>
import crackcanvas from "@/components/crackcanvas/crackcanvas"
import {identify, servers} from "@/api/api";

export default {
  components: {
    'crack-canvas': crackcanvas
  },
  data() {
    return {
      servers: [],
      choose_model: "",
      valid_type: ['image', 'video'],
      urls: [],
      files: [],
      threshold: 0.5,
      results: [],
      waiting: false
    };
  },
  mounted() {

    this.servers.length = 0
    let that = this
    servers().then(response => {
      let result = response.data.result
      for (let model in result) {
        for (let id in result[model]) {
          that.servers.push({model: model, ip: result[model][id]})
        }
      }
    }, err => {
      alert('获取后端服务器出错!\n'+err)
    })
  },
  computed: {
    identify_desc() {
      return this.waiting ? "正在上传文件进行识别，速度较慢请稍等!" : "获得结果"
    }
  },
  methods: {
    loadFile(event){
      let n = event.target.files.length
      for (let i = 0; i < n; i++) {
        let type = event.target.files[i].type.substr(0, 5)
        if (this.valid_type.indexOf(type) > -1) {
          let url = URL.createObjectURL(event.target.files[i]);
          this.urls.push([url, type])
          this.files.push(event.target.files[i])
        } else {
          alert("上传了不支持的文件类型!")
          this.urls.length = 0
          return
        }
      }
    },
    handle_identify() {
      function base64ToBlob(base64) {
        var mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // mime类型
        var byteString = atob(base64.split(',')[1]); //base64 解码
        var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
        var intArray = new Uint8Array(arrayBuffer); //创建视图
        for (var i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([intArray], {type: mimeString});
      }

      if (this.choose_model.length === 0) {
        alert("请先选择模型!")
        return
      }
      let choose_ip = this.choose_model.split(' ')[1]
      if (this.threshold.length === 0) {
        alert("请先输入分割阈值!")
        return
      }

      this.waiting = true

      this.results = []
      let that = this
      let res = []
      let axios_arr = []
      for (let i = 0; i < this.urls.length; i++) {
        // file TO base64
        let index = i
        axios_arr.push(new Promise((resolve, reject) => {
          let reader = new FileReader()
          let type = this.urls[i][1]
          let name = this.files[index].name
          reader.readAsDataURL(this.files[i])
          reader.onload=function(e) {
            // TODO: use choose_ip
            identify(process.env.VUE_APP_DEFAULT_IP, 60*1000, {
              'files': e.target.result,
              'types': type,
              'name': name,
              'threshold': that.threshold
            }).then(response => {
              resolve([response, index])
            }, err => {
              reject([err, index])
            })
          }
        }).then(response=>{
              let result = response[0].data.result
              let blob = base64ToBlob(result)
              let url = URL.createObjectURL(blob)
              res.push([url, blob.type, response[1]])
            },
            err=>{
              alert('服务器错误!\n'+err)
            }))
      }

      Promise.all(axios_arr).then(
          response_arr=>{
            res = res.sort((lhs, rhs) => {
              return lhs[2] - rhs[2]
            })
            that.results = res
            console.log(res)
          },
          err=>{
            alert("出错!\n" + err)
          }
      ).finally(
          () => {
            that.waiting = false
          }
      )
    }
  }
}
</script>

<style scoped>
.crack-container {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
}
.upload-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.upload-area {
  display: flex;
  flex-direction: row;
  position: relative;
  flex-wrap: wrap;
  height: 150px;
  width: 150px;
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

.control_div {
  display: flex;
  flex-direction: row;
  justify-content: left;
  height: 40px;
  width: 100%;
  margin-top: 3px;
  margin-left: 3px;
}
</style>