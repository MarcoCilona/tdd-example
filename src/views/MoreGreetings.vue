<template>
  <div>
    <h1 data-set-id="titleTest">{{ name }}</h1>
    <p data-set-id="paragraphGreetingsTest">Watch out, {{name}} is coming</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MoreGreetings extends Vue {
  name = '';

  mounted() {
    this.name = this.$route.params.name;
  }
}
</script>
