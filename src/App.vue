<template>
  <div class="container">
    <my-header />
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import  MyHeader from "./components/Header/index.vue";
export default {
    name: "App",
  components: {
    MyHeader
  }
};
</script>
