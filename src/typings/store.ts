import { NAV_TYPES } from ".";

// state.newsList的类型
interface INewsList {
  hasMore: boolean,
  isLoading: boolean,
  pageNum: number,
  count: number,
  news: INewsInfo[]
}

// 每一条news的类型
interface INewsInfo {
  uniquekey: string,
  title: string,
  date: string,
  category: string,
  author_name: string,
  url: string,
  thumbnail_pic_s?: string,
  thumbnail_pic_s02?: string,
  thumbnail_pic_s03?: string
}

// home -> state的类型
interface IHomeState {
  currentType: NAV_TYPES,
  newsList: INewsList
}

interface IDetailState {
  currentNews: INewsInfo
}

export {
  IHomeState,
  INewsInfo,
  INewsList,
  IDetailState
}