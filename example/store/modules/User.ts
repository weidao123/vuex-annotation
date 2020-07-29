import {Action, Autowried, Service} from '../../../src';
import { Order } from './Order';
import {BaseStore} from '../../../src/core/BaseStore';
import {State} from '@/store/state';

@Service({name: 'User'})
export class User extends BaseStore<State> {

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

  // action
  @Action()
  public setUserList(): void {
    this.name += 1;
    console.log(this.getRootState().User.name);
  }
}
