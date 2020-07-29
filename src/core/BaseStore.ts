import {VuexUtil} from './util';
import {Store} from 'vuex';

/**
 * 获取 状态树 根信息
 */
export class BaseStore<T = any> {

  protected getRootState(): T {
    return VuexUtil.store.state;
  }

  protected getStore(): Store<T> {
    return VuexUtil.store;
  }

}
