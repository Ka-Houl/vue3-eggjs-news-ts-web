<template>
  <div class="nav-item">
    <span @click="setCurIdx(item.type)">{{ item.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { INavBar } from "../../typings";

export default defineComponent({
  name: 'NavItem',
  props: {
    item: Object as PropType<INavBar>,
    index: Number
  },
  setup (props, { emit }) {  
    // 这是当前index值 
    const setCurIdx = (type: string): void => {
      emit('setCurIdx', props.index, type);
    }

    return {
      setCurIdx
    }
  }
})
</script>

<style lang="scss" scoped>
  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: .6rem;
    height: 100%;
    font-size: .16rem;

    &.active {
      color: #cf5f55;
    }
  }
</style>