<template>
  <div class="home">
    {{ user.age }}
    {{ user.computedAge }}
    <button @click="testActions">add count</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import Component from "vue-class-component";
import {User} from "../store/modules/User";
import {Autowried} from "../../src";
import {Order} from "../store/modules/Order";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Autowried()
  public order: Order;

  @Autowried()
  public user: User;

  public testActions() {
    console.log(this.user.addAge(10));
  }
}

</script>
