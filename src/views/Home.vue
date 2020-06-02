<template>
  <div class="home">
        {{ users.name }}
    <button @click="testActions">add count</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Component from "vue-class-component";
import {Autowried} from 'vuex-annotation';
import {User} from '@/store';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {

  @Autowried("User")
  public users2!: User;

  @Autowried()
  public users!: User;

  public testActions() {
    this.users.getUserList(1);
  }
}

</script>
