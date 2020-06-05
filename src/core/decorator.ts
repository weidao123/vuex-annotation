import 'reflect-metadata';
import IOCContainer from './container';
import {VuexUtil} from './util';

export enum DecoratorType {
  ACTION = 'ACTION',
  MUTATION = 'MUTATION',
  GETTER = 'GETTER',
  SERVICE = 'SERVICE',
}

export interface ServiceOptions {
  name: string
  namespace?: boolean
}

export function Provide(name?: string) {
  return function(target: any) {
    const key = name || target.name;
    IOCContainer.add(key, target);
  }
}

export function Service(options: ServiceOptions) {
  return function(target: any) {
    Reflect.defineMetadata(DecoratorType.SERVICE, options, target);

    // 将属性的读写 代理到真实的vuex Store
    const instance = new target();
    const keys = Object.keys(instance);
    keys.forEach((key) => {
      Object.defineProperty(instance, key, {
        get(): any {
          return VuexUtil.store.state[options.name][key]
        },
        set(v: any): void {
          VuexUtil.store.state[options.name][key] = v;
        }
      })
    });
    IOCContainer.add(options.name || target.name, instance);
  }
}

export function Action() {
  return function(target: any, name: string) {
    Reflect.defineMetadata(DecoratorType.ACTION, name, target[name]);
  }
}

export function Mutation() {
  return function(target: any, name: string) {
    Reflect.defineMetadata(DecoratorType.MUTATION, name, target[name]);
  }
}

export function Autowried(key?: string) {
  return function(target: any, name: string) {
    let obj: any;
    if (key) {
      obj = IOCContainer.getByName(key);
    } else {
      const type = Reflect.getMetadata('design:type', target, name);
      if (type) {
        obj = IOCContainer.getByType(type);
      }
    }
    Object.defineProperty(target, name, {
      enumerable: true,
      writable: true,
      value: obj
    })
  }
}
