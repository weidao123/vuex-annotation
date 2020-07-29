import {Action, Mutation, Service} from '../../../src';

@Service({ name: 'Order' })
export class Order {

  public order: number = 100;

  // mutation
  @Mutation()
  private updateOrder() {
    this.order += 100;
  }

  // action
  @Action()
  public setOrder() {
    this.updateOrder();
  }
}
