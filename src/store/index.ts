import { IDetailState, IHomeState } from '@/typings';
import { createStore } from 'vuex'

import home from './home';
import detail from './detail';

export interface IGlobalState {
  home: IHomeState,
  detail: IDetailState
}

// 合并模块
export default createStore<IGlobalState>({
  modules: {
    home,
    detail
  }
})
