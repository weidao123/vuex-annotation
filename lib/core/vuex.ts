import {ActionTree, GetterTree, MutationTree, Plugin} from 'vuex';
import vuex from 'vuex';
import Vue from 'vue';
import { VuexUtil } from './util';
Vue.use(vuex);

interface StoreOptionsModule<S = any> {
  modules?: any[]
  state?: S | (() => S);
  getters?: GetterTree<S, S>;
  actions?: ActionTree<S, S>;
  mutations?: MutationTree<S>;
  plugins?: Plugin<S>[];
  strict?: boolean;
  devtools?: boolean;
}

export class Vuex {
  constructor(options?: StoreOptionsModule) {
    this.options = options || {};
  }

  private readonly options: StoreOptionsModule;

  public createStore() {
    const options = this.options;
    const modules = {};
    if (this.options.modules) {
      this.options.modules.forEach((module) => {
        const target = VuexUtil.vuexModuleFactory(module);
        modules[target.name] = target;
      })
    }
    (options as any).modules = modules;
    const store = new vuex.Store(this.options as any);
    VuexUtil.store = store;
    return store;
  }
}
