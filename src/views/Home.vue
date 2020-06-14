<template>
  <div>
    <NameForm @submit='handleSubmit'/>
    <NameView :name='name' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Components
import NameForm from '@/components/NameForm.vue';
import NameView from '@/components/NameView.vue';

@Component(
  {
    components: {
      NameForm,
      NameView,
    },
  },
)
export default class Home extends Vue {
  name = '';

  handleSubmit($event: string) {
    this.name = $event;
  }
}
</script>

<style>
</style>
