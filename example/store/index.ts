import { Store } from '../../src';
import {User} from './modules/User';
import {Order} from './modules/Order';

const instance = new Store({
  modules: [User, Order]
});
export const store = instance.createStore();
