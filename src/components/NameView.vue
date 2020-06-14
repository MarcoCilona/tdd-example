<template>
  <div>
    <p data-test-id="paragraphTest">Hello {{ name }}</p>
    <button data-test-id='greetingsButton'
      @click='handleMoreGreetingsClick'>More greeting please!</button>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class NameView extends Vue {
  @Prop() name!: string;

  handleMoreGreetingsClick() {
    this.$router.push({
      path: `/more-greetings/${this.name}`,
    });
  }
}
</script>
