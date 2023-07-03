<template>
<div class="dataset-container">
  <input placeholder="请输入数据集名称" style="height: 10%; width: 100%">
  <textarea placeholder="请输入数据集描述" style="height: 85%; width: 100%" />
  <button style="height: 5%; width: 100%">提交</button>
</div>
</template>

<script>
export default {
  name: "create_dataset"
}
</script>

<style scoped>
.dataset-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>