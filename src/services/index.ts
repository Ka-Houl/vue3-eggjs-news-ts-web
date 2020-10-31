import { IPostData } from '@/typings';
import axios from '../lib/http';

// T就是返回数据的类型注解
// options -> IPostData
function getNewsList<T>(options: IPostData) {
  const { type, pageNum, count } = options;
  return axios.post<T, T>('/api/news_list', {
    type,
    pageNum,
    count
  }).then((data) => {
    return data;
  }).catch((err) => {
    throw new Error('Request failed:' + err);
  })
}

export {
  getNewsList
}