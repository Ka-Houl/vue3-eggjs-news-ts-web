<template>
  <div class="news-item type-1">
    <router-link :to="'/detail/' + item.uniquekey + '/' + pageFrom">
      <div class="main">
        <div class="title">
          <h1>{{ item.title }}</h1>
        </div>
        <div class="pic">
          <img :src="item.thumbnail_pic_s" class="news-thumb" :alt="item.title" ref="imgRef" />
        </div>
      </div>
      <div class="info">
        <span class="author">{{ item.author_name }}</span>
        <span class="date">{{ item.date }}</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import { useImgShow } from "../../../compositions";
import { INewsInfo } from "../../../typings";

export default defineComponent({
  name: 'Item1',
  props: {
    item: Object as PropType<INewsInfo>,
    pageFrom: String
  },
  setup () {
    const imgRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      useImgShow([imgRef]);
    });

    return {
      imgRef
    }
  }
})
</script>