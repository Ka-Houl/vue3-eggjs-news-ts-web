<template>
  <header class="header">
     <div class="icon-area left">
       <span
         :class="'iconfont icon-' + leftIcon"
         @click="goBackPage"
       ></span>
     </div>
     <h1>{{ title }}</h1>
     <div class="icon-area right">
      <span
        v-if="right && name === 'Detail'"
        :class="'iconfont icon-' + rightIcon"
        @click="handleFollowClick"
      ></span>
      <router-link 
        :to="rightPath"
        v-else-if="right && name !== 'Detail'"
      >
        <span :class="'iconfont icon-' + rightIcon"></span> 
      </router-link>
     </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import { useFollowedCheck, useNewsFollow, useRouteInfo } from "../../compositions";
import { IHeaderInfo } from '../../typings';


export default defineComponent({
  name: 'Header',
  setup () {
    const store: Store<any> = useStore();
    const route: RouteLocationNormalizedLoaded = useRoute();
    const router: Router = useRouter();
    const state: IHeaderInfo = reactive({
      name: 'Home',
      title: '新闻头条',
      left: false,
      right: true,
      leftIcon: '', 
      rightIcon: 'mine',
      leftPath: '',
      rightPath: '/mynews'
    });
  
    watch(() => {
      // 监听routeName的变化
      return route.name;
    }, (routeName) => {
      // 参数为变化后的值
      // 通过变化后的routeName 去到routeInfos里找相应的header配置信息
      const routeInfo: IHeaderInfo | undefined = useRouteInfo(routeName as string);
      // 将state和新的header配置信息合并
      Object.assign(state, routeInfo);
      
      // 检查是否收藏只会在detail页面进行
      if (routeName === 'Detail') {
        // 检查是否收藏的方法
        useFollowedCheck(route, (status) => {
          state.rightIcon = status ? 'star-full' : 'star-o';
        });
      }
    });
    
    // 返回上一页
    const goBackPage = (): void => {
      router.go(-1);
    }

    const handleFollowClick = (): void => {
      // 执行 -> 最终执行参数中的callback
      useNewsFollow(store, (status) => {
        // callback内部的status决定星星图标如何显示
        state.rightIcon = status ? 'star-full' : 'star-o';
      });
    }

    return {
      ...toRefs(state),
      goBackPage,
      handleFollowClick
    }
  }
})
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: .44rem;
    background-color: #cf5f55;
    color: #fff;

    h1 {
      text-align: center;
      line-height: .44rem;
      font-size: .18rem;
    }

    .icon-area {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      width: .44rem;
      height: .44rem;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }

      a {
        color: #fff;
      }

      .icon-mine {
        font-size: .25rem;
      }

      .iconfont.icon-arrow-right {
        vertical-align: .025rem;
      }

      .icon-star-o,
      .icon-star-full {
        font-size: .22rem;
        vertical-align: .025rem;
      }

      .icon-star-full {
        color: #F6BF4E;
      }
    }
  }
</style>