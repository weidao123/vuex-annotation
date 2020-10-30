import 'reflect-metadata';
import Container from './container';

export interface VuexModuleType {
  name: string
  namespaced: boolean
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

export function createModule(): VuexModuleType {
  return {
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    name: '',
    namespaced: true
  };
}

export function isNotNull (v: any) {
  return v !== null && v !== undefined;
}

export function getModule<T = any>(name: T): (T | any) {
  return Container.getByType(name);
}

export function useModule<T = any >(m: string | Function): T {
  if (typeof m === 'string') {
    return Container.getByName(m);
  }
  return Container.getByType(m);
}
