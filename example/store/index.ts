import { Vuex ,Action, Mutation, Service } from 'vuex-annotation';

@Service({name: 'User'})
export class User {

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
  public getUserList(data: any) {
    this.setName();
  }
}

const instance = new Vuex({
  modules: [User]
});
export const store = instance.createStore();
