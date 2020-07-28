<template>
  <div class="home">
        {{ users.name }}
      {{ order.order }}
    <button @click="testActions">add count</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import Component from "vue-class-component";
import {Autowried} from 'vuex-annotation';
import {Order} from '../store/Order';
import {User} from '../store/User';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Autowried()
  public users: User;
  @Autowried()
  public order: Order;

  public testActions() {
    this.users.setUserList();
  }
}

</script>
