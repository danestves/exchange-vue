<template>
  <table class="w-full">
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th><span>Ranking</span></th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hr</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in assets"
        :key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td class="text-center">
          <img
            class="w-12 h-12"
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
          />
        </td>
        <td class="text-center">
          <b># {{ asset.rank }}</b>
        </td>
        <td class="text-center">{{ asset.name }}</td>
        <td class="text-center">{{ asset.priceUsd | dollar }}</td>
        <td class="text-center">{{ asset.marketCapUsd | dollar }}</td>
        <td
          class="text-center"
          :class="
            parseFloat(asset.changePercent24Hr) < 0.0
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ asset.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'xAssetsTable',
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

.td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

.th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
