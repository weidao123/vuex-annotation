import 'reflect-metadata';
import Container from './container';

export enum DecoratorType {
  ACTION = 'ACTION',
  MUTATION = 'MUTATION',
  GETTER = 'GETTER',
  SERVICE = 'SERVICE',
  AUTOWRIED = 'AUTOWRIED',
}

export interface ServiceOptions {
  name: string
  namespaced?: boolean
}

export function Service(options: ServiceOptions) {
  return function(target: any) {
    Reflect.defineMetadata(DecoratorType.SERVICE, options, target);
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
    Object.defineProperty(target, name, {
      get(): any {
        if (key) {
          return Container.getByName(key);
        }
        const type = Reflect.getMetadata('design:type', target, name);
        return Container.getByType(type);
      },
      set(v: any): void {
        console.error('is ready only')
      }
    })
  }
}
