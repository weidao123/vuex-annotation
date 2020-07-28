import {Action, Autowried, Mutation, Service} from 'vuex-annotation';
import { Order } from './Order';

@Service({name: 'User'})
export class User {

  @Autowried("Order")
  private order: Order;

  public name: number = 1;

  // 计算属性
  public get nameGet() {
    return this.name;
  }

  public set nameGet(value: any) {
    this.name = value;
  }

  // mutation
  @Mutation()
  private setName() {
    this.name += 1;
  }

  // action
  @Action()
  public setUserList() {
    this.setName();
    console.log();
  }
}
