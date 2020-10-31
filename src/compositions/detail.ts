import { IGlobalState } from '@/store';
import { SET_CURRENT_NEWS } from '@/store/detail/actionTypes';
import { INewsInfo } from '@/typings';
import { computed } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { Store } from 'vuex';

// 获取当前的新闻信息
function useDetailInfo(store: Store<IGlobalState>, route: RouteLocationNormalizedLoaded): INewsInfo | undefined {
  /**
   * http://localhost:8080/detail/61304f4c7e7a571f21302d55cd623418/Home
   */
  // 新闻的唯一key
  const uniquekey: string = route.params.uniquekey as string;
  // 跳转详情页来源页面名称
  const pageFrom: string = route.params.from as string;
  
  /**
   * 如果pageFrom是收藏页：
   *    到localStorage里去拿到newsList数据
   * 如果不是收藏页
   *    到state里去拿新闻列表
   */
  const newsData: INewsInfo[] = pageFrom === 'MyNews'
        ? JSON.parse(localStorage.getItem('newsList') || '[]')
        : store.state.home.newsList.news;
  
  // 拿到newsData后，遍历，用uniquekey去对比每一项的uniquekey，相等则取出
  const newsInfo: INewsInfo | undefined = newsData.find((item: INewsInfo) => item.uniquekey === uniquekey);
  // 设置当前新闻信息
  store.dispatch(`detail/${SET_CURRENT_NEWS}`, newsInfo);

  return newsInfo;
}

function useNewsFollow (
  store: Store<IGlobalState>,
  callback: (status: boolean) => void
): void {
  // 首先从state中取出当前的新闻详情信息
  const currentNews: INewsInfo = computed(() => store.state.detail.currentNews).value;
   
  // 从localStorage中取出收藏的新闻列表
  let newsList: INewsInfo[] = JSON.parse(localStorage.getItem('newsList') || '[]');
  // 最终将返回的收藏与否的状态
  let followStatus: boolean = false;
  
  // 如果当前newsList数组不为空
  if (newsList.length) {
    // 在newsList中寻找currentNews(uniquekey)
    const isExist: INewsInfo | undefined = newsList.find((item: INewsInfo) => item.uniquekey === currentNews.uniquekey);
    // 如果信息存在
    if (isExist) {
      // 从newsList中删除当前的currentNews(uniquekey)
      newsList = newsList.filter((item: INewsInfo) => item.uniquekey !== currentNews.uniquekey);
      // 取消收藏
      followStatus = false;
    } else {
      // 不存在当前的新闻详情信息，给newsList放入当前的新闻
      newsList.push(currentNews);
      // 加入收藏
      followStatus = true;
    }
  } else {
    // newsList数据为空，给newsList放入当前的新闻
    newsList.push(currentNews);
    // 加入收藏
    followStatus = true;
  }
  
  // 把最后修改的newsList再次放入到localStorage中
  localStorage.setItem('newsList', JSON.stringify(newsList));
  // 执行回调，并传入收藏状态
  callback(followStatus);
}

// 检查是否收藏
function useFollowedCheck (
  route: RouteLocationNormalizedLoaded,
  callback: (status: boolean) => void
): void {
  const uniquekey = route.params.uniquekey;
  const pageFrom = route.params.from;
  
  // 如果是我的收藏列表页面来的，那么进入详情页，该新闻一定是收藏的新闻
  if (pageFrom === 'MyNews') {
    // 一定携带true
    callback(true);
    return;
  }
  
  // 首先到localStorage中获取newsList
  const newsList: INewsInfo[] = JSON.parse(localStorage.getItem('newsList') || '[]');
  
  // 如果newsList本身就是空，那么肯定没有收藏
  if (!newsList.length) {
    callback(false);
    return;
  }
  
  // 检查当前的uniquekey是否存在在newsList中的某一项新闻中
  const isExist: INewsInfo | undefined = newsList.find((item: INewsInfo) => item.uniquekey === uniquekey);
  
  // 携带状态
  callback(isExist ? true : false);
}

export {
  useDetailInfo,
  useNewsFollow,
  useFollowedCheck
}