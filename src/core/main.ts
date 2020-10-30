import Vuex, {ActionTree, GetterTree, MutationTree, Plugin, Store as VuexStore} from 'vuex';
import Vue from 'vue';
import {createModule, isNotNull, VuexModuleType} from './util';
import {DecoratorType, ServiceOptions} from "./decorator";
import Container from './container';

Vue.use(Vuex);

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

export class Store {

  private readonly options: StoreOptionsModule;
  private static store: VuexStore<any>;

  constructor(options?: StoreOptionsModule) {
    this.options = options || {};
  }

  public createStore() {

    const modules: {[key: string]: VuexModuleType} = {};
    const options = this.options;

    if (options.modules) {
      for (const op of options.modules) {
        const config = Reflect.getMetadata(DecoratorType.SERVICE, op) as ServiceOptions;
        if (!config) {
          continue;
        }

        const module = createModule();
        const instance = new op();
        const protoKeys = Object.getOwnPropertyNames(instance.__proto__).splice(1);
        module.name = isNotNull(config.name) ? config.name : op.namel;
        module.namespaced = typeof config.namespaced !== 'undefined' ? config.namespaced : true;

        // mutations and actions
        protoKeys.forEach((k) => {
          if (typeof instance[k] === 'function') {
            const isAction = Reflect.getMetadata(DecoratorType.ACTION, instance[k]);
            const isMutation = Reflect.getMetadata(DecoratorType.MUTATION, instance[k]);

            const name = instance[k].name;
            if (isAction) {
              module.actions[name] = instance[k].bind(instance);
            }
            if (isMutation) {
              module.mutations[name] = instance[k].bind(instance);
            }
          } else {
            module.getters[k] = () => instance[k];
          }
        });

        // state
        Object.keys(instance).forEach((k) => {
          const mutationKey = '__update_' + k + '__';
          module.mutations[mutationKey] = (state: any, value: any) => { state[k] = value };
          module.state[k] = instance[k];
          Object.defineProperty(instance, k, {
            set(v: any): void {
              const prefix = module.namespaced ? (module.name + '/') : '';
              Store.store.commit( prefix + mutationKey, v);
            },
            get: () => module.state[k]
          });
        });
        Container.add(module.name, instance);
        modules[module.name] = module;
      }
    }

    const store = new Vuex.Store({
      ...this.options,
      modules: modules
    });
    Store.store = store;
    return store;
  }
}
