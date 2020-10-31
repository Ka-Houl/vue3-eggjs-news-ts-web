<template>
  <div class="news-item type-0">
    <router-link :to="'/detail/' + item.uniquekey + '/' + pageFrom">
      <h1>{{ item.title }}</h1>
      <div class="info">
        <span class="author">{{ item.author_name }}</span>
        <span class="date">{{ item.date }}</span>
      </div>
    </router-link>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { INewsInfo } from "../../../typings";

export default defineComponent({
  name: 'Item0',
  props: {
    item: Object as PropType<INewsInfo>,
    pageFrom: String
  }
})
</script>