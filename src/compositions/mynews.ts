import { INewsInfo } from '@/typings';

function useFollowedList (): INewsInfo[] | null {
  // 从localStorage内部取到newsList
  const followedList: INewsInfo[] = JSON.parse(localStorage.getItem('newsList') || '[]');
  // 判断如果为空，那么就直接返回null
  if (!followedList.length) {
    return null;
  }
  
  // 返回列表数据
  return followedList;
}

export {
  useFollowedList
}