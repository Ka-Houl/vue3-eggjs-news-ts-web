<template>
  <div class="container">
    <nav-bar
      @setCurrentType="setCurrentType"
    />
    <sk-list
      :top="82"
      v-if="isSkLoading" 
    />
    <news-list
      v-show="!isSkLoading"
      :newsData="newsList"
      :top="82"
    />
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, onMounted, ref, watch } from "vue";
import { Store, useStore } from "vuex";
import { useNavType, useNewsList } from "../compositions";
import NavBar from '../components/NavBar/index.vue';
import NewsList from '../components/NewsList/index.vue';
import SkList from '../components/Skeleton/SkList.vue';
import { INewsInfo, NAV_TYPES } from "../typings";

  export default defineComponent({
    name: 'Home',
    components: {
      NavBar,
      NewsList,
      SkList
    },
    setup () {
      const store: Store<any> = useStore();
      // 返回列表数据
      const newsList: ComputedRef<INewsInfo[]> = useNewsList(store);
      // 返回一个更改类型的方法 / function, 给navBar 点击用
      const setCurrentType: (type: NAV_TYPES) => void = useNavType(store);
      // 骨架屏显示与否的变量
      const isSkLoading = ref<boolean>(true);
      
      // 当组件挂载完成后2000中骨架屏隐藏，newsList显示
      onMounted(() => {
        setTimeout(() => {
          isSkLoading.value = false;
        }, 2000);
      });
      
      // 监听state currentType ,当新闻类型变化的时候
      watch(() => {
        return store.state.home.currentType;
      }, () => {
        // 让骨架屏显示，2秒钟以后关闭骨架屏，显示newsList
        isSkLoading.value = true;
        setTimeout(() => {
          isSkLoading.value = false;
        }, 2000);
      })

      return {
        newsList,
        setCurrentType,
        isSkLoading
      }
    }
  }) 
</script>
