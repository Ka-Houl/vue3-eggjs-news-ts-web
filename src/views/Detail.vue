<template>
  <div class="container">
    <iframe :src="url" class="frame"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import { useDetailInfo } from "../compositions";
import { INewsInfo } from "../typings";

export default defineComponent({
  name: 'Detail',
  setup () {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const store: Store<any> = useStore();
    const router: Router = useRouter();
    //接收新闻详情信息并绑定到视图（url）
    const detailInfo: INewsInfo | undefined = useDetailInfo(store, route);
    
    // 如果在localStorage或者state里都没有取到响应的数据，那么则返回到首页
    if (!detailInfo) {
      router.push('/');
      return;
    }

    return {
      url: detailInfo.url
    }
  }
})
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;

    .frame {
      width: 100%;
      height: 100%;
      margin-top: .44rem;
      border: 0;
      overflow-y: auto;
    }
  }
</style>