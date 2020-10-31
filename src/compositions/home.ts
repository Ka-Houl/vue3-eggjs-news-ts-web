import { IGlobalState } from '@/store';
import { SET_CURRENT_TYPE, SET_NEWS_LIST } from '@/store/home/actionTypes';
import { IHomeState, INewsInfo, IPostData, NAV_TYPES } from '@/typings';
import { computed, ComputedRef } from 'vue';
import { Store } from 'vuex';

// 返回值是一个[{}] -> ComputedRef类型
function useNewsList(store: Store<IGlobalState>): ComputedRef<INewsInfo[]> {

  const state: IHomeState = store.state.home;
  // 取出请求参数
  const type: NAV_TYPES = computed(() => state.currentType).value;
  const pageNum: number = computed(() => state.newsList.pageNum).value;
  const count: number = computed(() => state.newsList.count).value;
  // 最终的数据列表
  const newsList: ComputedRef<INewsInfo[]> = computed(() => state.newsList.news);

  store.dispatch(`home/${SET_NEWS_LIST}`, <IPostData>{
    type, pageNum, count
  });

  return newsList;
}

function useNavType(store: Store<IGlobalState>) {
  return (type: NAV_TYPES): ComputedRef<INewsInfo[]> => {
    store.dispatch(`home/${SET_CURRENT_TYPE}`, type);
    const newsList: ComputedRef<INewsInfo[]> = useNewsList(store);

    return newsList;
  }
}

export {
  useNewsList,
  useNavType
}