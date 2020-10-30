import {Action, Mutation, Service} from '../../../src';

@Service({ name: 'Order' })
export class Order {

  public order: number = 100;

  // action
  @Action()
  public setOrder(num: number) {
    this.order -= num;
  }

}
