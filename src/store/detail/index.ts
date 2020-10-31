import state from './state';
import actions from './actions';
import mutations from './mutations';
import { Module } from 'vuex';
import { IGlobalState } from '..';
import { IDetailState } from '@/typings';

// Module是vuex store模块的基本类型，接收两个泛型
// 1. 当前模块state的类型，vuex全局state的类型
const detailModule: Module<IDetailState, IGlobalState> = {
  namespaced: true, // 开启命名空间
  state,
  actions,
  mutations
}

export default detailModule;