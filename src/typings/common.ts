import { INewsInfo } from './store';

// 路由对应的Header设置信息
interface IHeaderInfo {
  name: string,
  title: string,
  left: boolean,
  right: boolean,
  leftIcon: string,
  rightIcon: string,
  leftPath: string,
  rightPath: string
}

// 新闻类型的枚举
enum NAV_TYPES {
  TOP = 'top',
  SHEHUI = 'shehui',
  GUONEI = 'guonei',
  GUOJI = 'guoji',
  YULE = 'yule',
  TIYU = 'tiyu',
  JUNSHI = 'junshi',
  KEJI = 'keji',
  CAIJING = 'caijing',
  SHISHANG = 'shishang'
}

// 请求数据需要的参数类型
interface IPostData {
  type: NAV_TYPES,
  pageNum: number,
  count: number
}

// 返回数据的类型
interface IRetNewsData {
  data: INewsInfo[] | null,
  hasMore: boolean
}

export {
  IHeaderInfo,
  NAV_TYPES,
  IPostData,
  IRetNewsData
}