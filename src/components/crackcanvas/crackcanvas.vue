<template>
  <div class="crack-canvas">
    <canvas ref="canvas" id="canvas" width="100" height="100" style="border-width: 1px; border-style: solid; border-color: gray"></canvas>
    <div class="crack-control" v-if="type.substr(0, 5) === 'video'">
      <button ref="play-button" id="play-button" style="width: 34%; height: 100%; font-size: 50%; color: red">播放</button>
      <button ref="pause-button" id="pause-button" style="width: 34%; height: 100%; font-size: 50%; color: red">暂停</button>
      <button ref="stop-button" id="stop-button" style="width: 34%; height: 100%; font-size: 50%; color: red">重置</button>
    </div>
    <div class="download">
      <button @click="save" style="width: 34%; height: 100%; font-size: 75%; color: red">下载</button>
    </div>
    <video ref="source" id="source" controls autoplay="autoplay" src="" muted style="width: 1px; height: 1px; display: none"></video>
  </div>
</template>




<script>

export default {
  name: "crack-canvas",
  data() {
    return {
    }
  },
  props: {
    type: "",
    url: "",
    name: "",
  },
  mounted() {
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext("2d");
    let tw = parseInt(window.getComputedStyle(canvas).width)
    let th = parseInt(window.getComputedStyle(canvas).height)

    if (this.type.substr(0, 5) === 'image') {
      var img = new Image();
      img.src = this.url;
      img.onload = function () {
        ctx.drawImage(img, 0, 0, tw, th);
      }
    } else if (this.type.substr(0, 5) === 'video') {
      var video = this.$refs.source;
      var play_button = this.$refs["play-button"]
      var pause_button = this.$refs["pause-button"]
      var stop_button = this.$refs["stop-button"]

      play_button.addEventListener('click', function () {
        video.play()
      });

      pause_button.addEventListener('click', function () {
        video.pause()
      });

      stop_button.addEventListener('click', function () {
        video.currentTime = 0
        video.pause()
      });

      console.log(window.getComputedStyle(canvas).width)
      console.log(window.getComputedStyle(canvas).height)
      console.log(tw)
      console.log(th)
      // 每 20 毫秒，代码就会绘制视频的当前帧
      video.addEventListener('play', function () {//播放
        let i = window.setInterval(function () {
          ctx.drawImage(video, 0, 0, tw, th);
        }, 20)
      }, false)

      video.addEventListener('ended', function () {//播放
        video.currentTime = 0
      })

      video.srcObject = null
      video.src = this.url
      video.play()
    }
  },
  methods: {
    save() {
      let aLink = document.createElement('a')
      let evt = document.createEvent("HTMLEvents")
      evt.initEvent("click", true, true)
      aLink.download = this.name
      aLink.href = this.url
      aLink.click()
    }
  }
}
</script>

<style scoped>
.crack-canvas {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 3px;
  width: 100%;
  height: 100%;
}

.crack-control {
  display: none;
  flex-direction: row;
  position: absolute;
  left: 0%;
  top: 80%;
  width: 100%;
  height: 10%;
}

.download {
  display: none;
  flex-direction: row;
  justify-content: right;
  position: absolute;
  left: 0%;
  top: 5%;
  width: 100%;
  height: 10%;
  text-align: center;
  font-size: 75%;
}

.crack-canvas:hover .crack-control{
  display: flex;
}
.crack-canvas:hover .download{
  display: flex;
}
</style>
