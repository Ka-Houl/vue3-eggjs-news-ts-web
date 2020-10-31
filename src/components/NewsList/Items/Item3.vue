<template>
  <div class="news-item type-3">
    <router-link :to="'/detail/' + item.uniquekey + '/' + pageFrom">
      <div class="main">
        <div class="title">
          <h1>{{ item.title }}</h1>
        </div>
        <div class="pic">
          <div class="img">
            <img :src="item.thumbnail_pic_s" class="news-thumb" :alt="item.title" ref="imgRef1" />
          </div>
          <div class="img">
            <img :src="item.thumbnail_pic_s02" class="news-thumb" :alt="item.title" ref="imgRef2" />
          </div>
          <div class="img last">
            <img :src="item.thumbnail_pic_s03" class="news-thumb" :alt="item.title" ref="imgRef3" />
          </div>
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
  name: 'Item3',
  props: {
    item: Object as PropType<INewsInfo>,
    pageFrom: String
  },
  setup () {
    const imgRef1 = ref<null | HTMLElement>(null);
    const imgRef2 = ref<null | HTMLElement>(null);
    const imgRef3 = ref<null | HTMLElement>(null);

    onMounted(() => {
      useImgShow([imgRef1, imgRef2, imgRef3]);
    });

    return {
      imgRef1,
      imgRef2,
      imgRef3
    }
  }
})
</script>