import { IHomeState, INewsInfo, IPostData, NAV_TYPES } from '@/typings';
import { Commit } from 'vuex';
import * as actionTypes from './actionTypes';
import { getNewsList } from '../../services';

export default {
  // 设置news数据的方法
  [actionTypes.SET_NEWS_LIST]({ commit, state }: { commit: Commit, state: IHomeState }, options: IPostData) {
    
    // 如果isLoading是真，就不能请求数据
    if (state.newsList.isLoading) {
      return;
    }
    
    // 如果hasMore是假，也不能请求数据
    if (!state.newsList.hasMore) {
      return;
    }
    
    /**
     * pageNum === 0，第一页加载的时候，我们要用骨架屏，「正在加载中...」就不能显示
     * pageNum > 0, 不是第一页，就是触底加载更多，就要显示「正在加载中...」
     */
    if (state.newsList.pageNum) {
      commit(actionTypes.SET_LOADING, true);
    }
    
    // 请求数据，返回的数据的类型INewsInfo[]
    getNewsList<INewsInfo[]>(options).then((data) => {
      // 去操作数据
      commit(actionTypes.SET_NEWS_LIST, data);
    }).catch((err) => {
      throw err;
    })
  },
  // 更改新闻类型的action
  [actionTypes.SET_CURRENT_TYPE]({ commit }: { commit: Commit }, type: NAV_TYPES) {
    commit(actionTypes.SET_CURRENT_TYPE, type);
  }
}