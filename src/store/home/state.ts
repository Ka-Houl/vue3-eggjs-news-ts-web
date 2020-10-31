import { NAV_TYPES } from "@/typings";
import { IHomeState, INewsList } from '@/typings';

const state: IHomeState = {
  // 当前的新闻类型设置
  currentType: NAV_TYPES.TOP,
  newsList: <INewsList>{
    // 是否还有更多数据
    hasMore: true,
    // 是否正在加载中
    isLoading: false,
    // 当前页码
    pageNum: 0,
    // 一页显示多少数据
    count: 10,
    // 当前的新闻列表数据
    news: []
  }
}

export default state;