import { INewsInfo } from '@/typings';
import { Commit } from 'vuex';
import * as actionTypes from './actionTypes';

export default {
  [actionTypes.SET_CURRENT_NEWS] ({ commit }: { commit: Commit }, newsInfo: INewsInfo) {
    commit(actionTypes.SET_CURRENT_NEWS, newsInfo);
  }
}