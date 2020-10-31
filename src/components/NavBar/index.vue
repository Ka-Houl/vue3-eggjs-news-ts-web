<template>
  <nav 
    class="nav-bar"
    v-nav-current="{
      activeClass: 'active',
      className: 'nav-item',
      curIdx
    }"
  >
    <div class="scroll-area">
      <div 
        class="nav-list"
        :style="{ width: navData.length * 0.6 + 'rem' }"
      >
        <nav-item
          v-for="(item, index) of navData"
          :key="item.type"
          :item="item"
          :index="index"
          @setCurIdx="setCurIdx"
        />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import NavItem from './Item.vue';
import navData from '../../data/nav';
import { navCurrent } from '../../directives';

export default defineComponent({
  name: 'NavBar',
  components: {
    NavItem
  },
  directives: {
    navCurrent
  },
  setup (props, { emit }) {
    
    const state = reactive({
      curIdx: 0
    });
    
    // 设置当前index值
    const setCurIdx = (curIdx: number, type: string): void => {
      state.curIdx = curIdx;
      emit('setCurrentType', type);
    }

    return {
      navData,
      ...toRefs(state),
      setCurIdx
    }
  }
})
</script>

<style lang="scss" scoped>
  .nav-bar {
    position: fixed;
    top: .44rem;
    left: 0;
    z-index: 1;
    width: 100%;
    height: .38rem;
    border-bottom: .01rem solid #ddd;
    background-color: #fff;
    overflow: hidden;

    .scroll-area {
      width: 100%;
      height: .45rem;
      overflow-x: auto;

      .nav-list {
        display: flex;
        flex-direction: row;
        height: .38rem;
      }
    }
  }
</style>