import { IGlobalState } from '@/store';
import { IHeaderInfo, IHomeState, IPostData, NAV_TYPES } from '@/typings';
import _ from 'lodash';
import { computed, onMounted, Ref } from 'vue';
import { Store } from 'vuex';
import { headerInfos } from '../router';

// 获取header对应的路由信息
/**
 * {
    // 路由名称
    name: 'Home',
    // header标题
    title: '新闻头条',
    // 左图标是否显示
    left: false,
    // 右图标是否显示
    right: true,
    // 左边显示的图标名称 // 'iconfont icon-' + ...path
    leftIcon: '',
    // 右边显示的图标名称
    rightIcon: 'mine',
    // 左边图标的路由
    leftPath: '',
    rightPath: '/mynews'
  }
 * 返回值 IHeaderInfo, 没找到对应的数据 -> undefined
 */
function useRouteInfo (routeName: string): IHeaderInfo | undefined {
  const routeInfo: IHeaderInfo | undefined = headerInfos.find((item: IHeaderInfo) => item.name === routeName);

  return routeInfo;
}

// 图片淡入
function useImgShow (imgRefs: Ref<null | HTMLElement>[]): void {
  // 收集Item里的所有图片的ref，遍历refs, 当图片加载完成的时候，然后图片的透明度为1
  imgRefs.map((imgRef) => {
    const oImg = imgRef.value!;

    oImg.onload = function () {
      oImg.style.opacity = '1';
    }
  })
}

/**
 * 
 * @param store {Store<IGlobalState>} 仓库
 * @param module {string} store的模块名： home  detail
 * @param actionType {string} action type module/actionTypes
 * @param element {Ref<null | HTMLElement>} list元素
 */
function useLoadingMore (
  // 仓库
  store: Store<IGlobalState>,
  // store的模块名： home  detail
  module: string,
  // action type module/actionTypes
  actionType: string,
  // list元素
  element: Ref<null | HTMLElement>
) {
  let el: HTMLElement;
  let state: IHomeState;
  
  // 类型断言操作
  switch (module) {
    case 'home':
      state = store.state.home as IHomeState;
      break;
    default: 
      break;
  }

  onMounted(() => {
    // 注意这里需要类型断言，因为element类型中有null
    el = element.value as HTMLElement;
    // 给列表元素绑定scroll事件处理函数，使用lodash工具库中的防抖函数debounce
    el.addEventListener('scroll', _.debounce(_loadMore, 300), false);
  });

  function _loadMore(): void {
    // 拿到列表高度、滚动高度、滚动的top值
    const listHeight: number = el.clientHeight;
    const scrollHeight: number = el.scrollHeight;
    const scrollTop: number = el.scrollTop;

    const type: NAV_TYPES = computed(() => state.currentType).value;
    const pageNum: number = computed(() => state.newsList.pageNum).value;
    const count: number = computed(() => state.newsList.count).value;
    
    // 当列表高度 + 滚动的top值 >= 滚动高度 - 30 证明还有30像素就触底了
    if (listHeight + scrollTop >= scrollHeight - 30) {
      // 只要距底部还有30像素，就继续请求数据，加载更多列表内容
      store.dispatch(`${module}/${actionType}`, <IPostData>{
        type, pageNum, count
      });
    }
  }

  return {
    // 返回当前的isLoading和hasMore状态
    isLoading: computed(() => state.newsList.isLoading),
    hasMore: computed(() => state.newsList.hasMore)
  }
}

export {
  useRouteInfo,
  useImgShow,
  useLoadingMore
}