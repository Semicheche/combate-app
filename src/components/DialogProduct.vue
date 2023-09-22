<template>
<q-card-section>
        <div class="text-h6">{{ detalhes.titulo }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ detalhes.detalhes }}
      </q-card-section>
      <q-card-actions align="center" class="q-mb-xl">
      <q-btn class="bg-orange text-white full-width btn-search" label="Fechar" size="lg" v-close-popup />
    </q-card-actions>
</template>
<script>
export default {
  name: 'DialogProduct',
  props: ['detalhes']
}
</script>
