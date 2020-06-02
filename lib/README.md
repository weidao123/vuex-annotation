

# vuex-annotation

###### If you like typescript, you will like it

### Description

A plug-in based on vuex, which aims to make vuex cooperate with typescript to maximize its power



### API

* Service()
* Mutation()
* Action()
* Autowried() 



### Example

yarn add vuex-annotation  or  npm install vuex-annotation

```typescript
// store/modules/User.ts
import { Vuex ,Action, Mutation, Service } from 'vuex-annotation';

// This is a module of vuex
@Service({name: 'User'})
export class User {

  // state
  public age: number = 1;

  // getter
  public get ageGetter() {
    return this.age;
  }

  @Mutation()
  private setAge() {
    this.age += 1;
  }

  @Action()
  public updateUserInfo(data: any) {
    this.setAge();
  }
}
```

```typescript
// store/index.ts
import {User} from './modules/User';

const instance = new Vuex({
  modules: [User]  // Just drop the modules to modules
});
export const store = instance.createStore();
```

**Use in components**

```typescript
// ...
import {User} from '@/store';

export default class Home extends Vue {

  @Autowried("User")  // Inject by name
  public users2!: User;

  @Autowried()  // Inject by type
  public users!: User;

  public testActions() {
    this.users.updateUserInfo(1);
  }
}
```

