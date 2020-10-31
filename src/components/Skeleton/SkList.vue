<template>
  <div class="skeleton-list" :style="{ 'top': '.' + top + 'rem' }">
    <div class="news-item type-0">
      <h1></h1>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
    <div class="news-item type-1">
      <div class="main">
        <div class="title">
          <h1></h1>
        </div>
        <div class="pic"></div>
      </div>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
    <div class="news-item type-3">
      <div class="main">
        <div class="title">
          <h1></h1>
        </div>
        <div class="pic">
          <div class="img"></div>
          <div class="img"></div>
          <div class="img last"></div>
        </div>
      </div>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
    <div class="news-item type-0">
      <h1></h1>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
    <div class="news-item type-2">
      <div class="main">
        <div class="title">
          <h1></h1>
        </div>
        <div class="pic">
          <div class="img"></div>
          <div class="img last"></div>
        </div>
      </div>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
    <div class="news-item type-0">
      <h1></h1>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
    <div class="news-item type-2">
      <div class="main">
        <div class="title">
          <h1></h1>
        </div>
        <div class="pic">
          <div class="img"></div>
          <div class="img last"></div>
        </div>
      </div>
      <div class="info">
        <span class="author"></span>
        <span class="date"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkList",
  props: {
    top: Number,
  },
};
</script>

<style lang="scss" scoped>
.skeleton-list {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  background-color: #fff;
  animation: twinkle 1.8s infinite ease-in-out;
}

@keyframes twinkle {
  0% {
    opacity: .5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .5;
  }

}

.news-item {
  padding: 0.1rem 0.1rem 0;
  box-sizing: border-box;

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.25rem;
    border-bottom: 0.01rem solid #eee;
    font-size: 0.12rem;

    .author,
    .date {
      display: inline-block;
      width: 0.6rem;
      height: 0.15rem;
      background-color: #eee;
    }
  }

  .title {
    padding: 0.05rem 0;

    h1 {
      height: 0.22rem;
      background-color: #eee;
    }
  }

  h1 {
    height: 0.22rem;
    background-color: #eee;
  }

  &.type-1 {
    .main {
      display: flex;
      flex-direction: row;

      .pic {
        flex: 1;
        height: 0.86rem;
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
        height: 0.86rem;
        background-color: #eee;
        margin-right: 0.05rem;

        font-size: 0;

        &.last {
          margin: 0;
        }
      }
    }
  }
}
</style>