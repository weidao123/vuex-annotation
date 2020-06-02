import 'reflect-metadata';
import {DecoratorType, ServiceOptions} from './decorator';
import { Store } from 'vuex';

export interface VuexModuleType {
  name: string
  namespace: boolean
  state: {
    [key: string]: any
  }
  actions: {
    [key: string]: any
  }
  mutations: {
    [key: string]: any
  }
  getters: {
    [key: string]: any
  }
}

function createModule(): VuexModuleType {
  return {
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    name: '',
    namespace: true
  };
}

interface Attributes {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}

// 工具类
export class VuexUtil {

  public static store: Store<any>;

  public static vuexModuleFactory(VuexModule: any): VuexModuleType{
    const modules = createModule();
    const options: ServiceOptions = Reflect.getMetadata(DecoratorType.SERVICE, VuexModule);
    modules.name = options.name;
    modules.namespace = typeof options.namespace !== 'undefined' ? options.namespace : true;

    const instance = new VuexModule();

    // 创建State
    const names = Object.getOwnPropertyNames(instance);
    names.forEach((name) => {
      const desc = Object.getOwnPropertyDescriptor(instance, name);
      if (desc) {
        modules.state[name] = desc.value;
      }
      VuexUtil.createProxy(instance, name, {
        get(): any {
          return modules.state[name];
        },
        set(value: any): void {
          modules.state[name] = value;
        }
      });
    });

    // 创建Mutations Actions
    const methodNames = Object.getOwnPropertyNames(instance.__proto__);
    methodNames.forEach((name) => {
      if (name === 'constructor') {
        return;
      }
      const method = instance[name];

      if (typeof instance[name] !== 'function') {
        modules.getters[name] = () => {
          return instance[name];
        };
        return;
      }
      const metadataKeys = Reflect.getMetadataKeys(method);
      const isAction = metadataKeys.includes(DecoratorType.ACTION);
      const isMutation = metadataKeys.includes(DecoratorType.MUTATION);
      if (isAction) {
        modules.actions[name] = (params: any, payload: any = {}) => {
          instance[name](payload);
        };
      } else if (isMutation) {
        modules.mutations[name] = (state: any, payload: any) => {
          instance[name](payload);
        }
      }
    });
    return modules;
  }

  // 创建代理
  private static createProxy(target: any, name: string, attrs: Attributes) {
    Object.defineProperty(target, name, {
      ...attrs
    })
  }
}
