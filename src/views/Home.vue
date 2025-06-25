<template>
  <div class="home">
    <h1>Welcome to FIT5032!</h1>
    <!-- 引入 MyName 组件 -->
    <MyName /> 
  </div>
</template>

<script>
// 导入组件
import MyName from "../components/MyName.vue";

export default {
  name: "Welcome",
  components: { MyName } // 注册组件
};
</script>