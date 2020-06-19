<template>
<div>
  <p data-test-id='typeParagraph'>{{ user }}</p>
  <button data-test-id='userButton' @click='handleClick'>Retrieve user!</button>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import api from '@/api.ts';

@Component
export default class NockNock extends Vue {
  user = '';

  async handleClick() {
    await api.searchUser('Castrogiovanni');
    this.user = 'Digitiamo';
  }
}
</script>
