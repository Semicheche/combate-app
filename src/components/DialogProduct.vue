<template>
<q-card-section>
        <div class="text-h6">{{ detalhes.titulo }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <h6> {{ detalhes.descricao }}</h6>
        <div v-if="detalhes.produtosEstoque">
            <q-table
              flat bordered
              title="Estoque Filiais"
              virtual-scroll
              :rows="detalhes.produtosEstoque"
              :columns="detalhes.produtosEstoqueCol"
              :rows-per-page-options="[0]"
              row-key="name"
            />
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-ma-md fixed-button">
      <q-btn class="bg-orange text-white btn-search" label="" icon="expand_more" rounded size="xl" v-close-popup />
    </q-card-actions>
</template>
<script>
export default {
  name: 'DialogProduct',
  props: ['detalhes']
}
</script>
<style>
.fixed-button  {
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
