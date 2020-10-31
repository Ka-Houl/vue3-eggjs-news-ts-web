<template>
  <div class="container">
    <news-list
      :newsData="followedList"
      :top="44"
      v-if="followedList"
    />
    <no-data v-if="!followedList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFollowedList } from "../compositions";
import { INewsInfo } from "../typings";

import NewsList from '../components/NewsList/index.vue';
import NoData from '../components/NoData/index.vue';

export default defineComponent({
  name: 'MyNews',
  components: {
    NewsList,
    NoData
  },
  setup () {
    const followedList: INewsInfo[] | null = useFollowedList();

    return {
      followedList
    };
  }
})
</script>