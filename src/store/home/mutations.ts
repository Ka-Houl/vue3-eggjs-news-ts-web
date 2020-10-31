import { IHomeState, INewsList, IRetNewsData, NAV_TYPES } from '@/typings';
import * as actionTypes from './actionTypes';

export default {
  [actionTypes.SET_LOADING] (state: IHomeState, isLoading: boolean) {
    state.newsList.isLoading = isLoading;
  },
  [actionTypes.SET_NEWS_LIST] (state: IHomeState, payload: IRetNewsData) {
    // 如果hasMore返回的是真，就证明还有下一页，那就一定要合并state -> news
    // 并且要给pageNum + 1，因为下一次请求的时候需要下一页的PageNum
    if (payload.hasMore) {
      state.newsList.news = [...state.newsList.news, ...payload.data!];
      state.newsList.pageNum += 1;
    }
    // 不管hasMore返回的是真是假
    // 都要重新赋值state hasMore
    state.newsList.hasMore = payload.hasMore;
    // 都要将isLoading设置为false
    state.newsList.isLoading = false;
  },

  // 更改新闻类型的方法
  [actionTypes.SET_CURRENT_TYPE] (state: IHomeState, type: NAV_TYPES) {
    state.currentType = type;
    
    // 由于新闻类型改变，所以newsList内部所有属性都要还原成默认值
    state.newsList = <INewsList>{
      hasMore: true,
      isLoading: false,
      pageNum: 0,
      count: 10,
      news: []
    }
  }
}