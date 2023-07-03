<template>
<div class="sidebar-container">
  <sidebar-item v-for="item in authorized_menu" :item="item" :base-path="item.path"></sidebar-item>
</div>
</template>

<script>
import sidebar_item from "@/layout/sidebar/sidebar_item";
export default {
  name: "sidebar",
  components: {
    'sidebar-item': sidebar_item
  },
  data() {
    return {
      menu: [{
        title: '裂缝识别',
        name: 'tag1',
        icon: require('@/icons/recognition.svg'),
        path: '/identify',
        admin: false,
        children: []
      },{
        title: '数据集',
        name: 'tag2',
        icon: require('@/icons/dataset.svg'),
        path: '/datasets',
        admin: true,
        children: [
          {
            title: '编辑数据集',
            icon: require('@/icons/edit.svg'),
            path: 'edit',
          },
          {
            title: '扩充数据集',
            icon: require('@/icons/expand.svg'),
            path: 'expand',
          },
          {
            title: '创建数据集',
            icon: require('@/icons/create.svg'),
            path: 'create',
          },
        ]
      },{
        title: '神经网络模型',
        name: 'tag3',
        icon: require('@/icons/models.svg'),
        path: '/models',
        admin: true,
        children: [
          {
            title: '训练模型',
            icon: require('@/icons/train.svg'),
            path: 'train',
          },{
            title: '微调模型',
            icon: require('@/icons/fine_tune.svg'),
            path: 'fine_tune',
          }
        ]
      },{
        title: '操作日志',
        name: 'tag4',
        icon: require('@/icons/logs.svg'),
        path: '/logs',
        admin: false,
        children: []
      }]
    }
  },
  computed: {
    authorized_menu() {
      let res = []
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].admin && window.localStorage.getItem("crack_role") !== 'admin') {
          continue;
        }
        res.push(this.menu[i])
      }
      return res
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
}

</style>