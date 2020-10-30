import {Action, getModule, Service} from '../../../src';
import {Order} from "./Order";

@Service({name: 'User', namespaced: false})
export class User {

  public age: number = 1;

  // 计算属性
  public get computedAge() {
    return this.age * 100;
  }

  // action
  @Action()
  public addAge(num: number): void {
    getModule(Order).setOrder(num);
    this.age += num;
  }
}
