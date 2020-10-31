import { IDetailState, INewsInfo } from '@/typings';
import * as actionTypes from './actionTypes';

export default {
  [actionTypes.SET_CURRENT_NEWS] (state: IDetailState, newsInfo: INewsInfo) {
    state.currentNews = newsInfo;
  }
}