<template>
  <div>
    <input data-test-id="inputTest" v-model='name' />
    <button data-test-id="buttonTest" @click='handleClick'>Click me!</button>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';

@Component
export default class NameForm extends Vue {
  name = '';

  handleClick() {
    this.$emit('submit', this.name);
    this.name = '';
  }
}
</script>
