import { Vuex } from 'vuex-annotation';
import {User} from './User';
import {Order} from './Order';

const instance = new Vuex({
  modules: [User, Order]
});
export const store = instance.createStore();
