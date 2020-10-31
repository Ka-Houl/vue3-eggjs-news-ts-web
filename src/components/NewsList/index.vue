<template>
  <div
    class="news-list"
    :style="{ 'top': '.' + top + 'rem' }"
    ref="newsListRef"
  >
    <template
      v-for="item of newsData"
    >
      <news-item-0
        v-if="!item.thumbnail_pic_s"
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />
      <news-item-1
        v-else-if="!item.thumbnail_pic_s02"
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />
      <news-item-2
        v-else-if="!item.thumbnail_pic_s03"
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />
      <news-item-3
        v-else
        :item="item"
        :key="item.uniquekey"
        :pageFrom="pageFrom"
      />
    </template>
    <loading v-if="isLoading" />
    <no-more v-if="!hasMore" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { SET_NEWS_LIST } from "../../store/home/actionTypes";
import { IHomeState, INewsInfo } from "../../typings";
import { Store, useStore } from 'vuex';

import NewsItem0 from './Items/Item0.vue';
import NewsItem1 from './Items/Item1.vue';
import NewsItem2 from './Items/Item2.vue';
import NewsItem3 from './Items/Item3.vue';
import Loading from '../Loading/index.vue';
import NoMore from '../NoMore/index.vue';
import { useLoadingMore } from "../../compositions";

export default defineComponent({
  name: "NewsList",
  components: {
    NewsItem0,
    NewsItem1,
    NewsItem2,
    NewsItem3,
    Loading,
    NoMore
  },
  props: {
    newsData: Array as PropType<INewsInfo[]>,
    top: Number
  },
  setup () {
    const pageFrom = ref<string>('');
    const newsListRef = ref<null | HTMLElement>(null);
    const route: RouteLocationNormalizedLoaded = useRoute();
    const store: Store<any> = useStore();
    // 返回的isLoading, hasMore
    // isLoading决定Loading组件的显示与否
    // hasMore决定NoMore组件显示与否
    const { isLoading, hasMore } = useLoadingMore(store, 'home', SET_NEWS_LIST, newsListRef);
    // pageFrom是为了告诉详情页，在哪里去获取当前新闻的详情
    // 如果是Home 就去取state的news，如果是mynews 就去localstorage里找newsList
    pageFrom.value = route.name as string;

    return {
      pageFrom,
      newsListRef,
      isLoading, 
      hasMore
    }
  }
});
</script>

<style lang="scss">
.news-list {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  background-color: #fff;
  overflow-y: auto;
}

.news-item {
  padding: .1rem .1rem 0;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .3s linear;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.25rem;
    color: #999;
    border-bottom: 0.01rem solid #ededed;
    font-size: .12rem;

    .author {
      margin-right: 0.1rem;
    }
  }

  .title {
    padding: 0.05rem 0;
    line-height: .2rem;

    h1 {
      font-size: 0.16rem;
    }
  }

  &.type-1 {
    .main {
      display: flex;
      flex-direction: row;

      .pic {
        flex: 1;
        background-color: #eee;
        box-sizing: border-box;
      }

      .title {
        flex: 2;
        padding-right: 0.1rem;
        box-sizing: border-box;
      }
    }
  }

  &.type-2,
  &.type-3 {
    .pic {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .img {
        width: 33.33%;
        flex: 1 1 auto;
        margin-right: 0.05rem;
        background-color: #eee;
        font-size: 0;

        &.last {
          margin: 0;
        }
      }
    }
  }
}
</style>