<template>
  <div class="about">
    <h1>This is an about page</h1>
<!--    <h1>{{ user.name }}</h1>-->
    <button @click="test">add</button>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class About extends Vue {
  // @Autowried()
  // public user: User;

  public test(e: Event) {
    // this.user.setUserList();
  }
}
</script>
