<template>
  <div class="w-full overflow-auto">
    <table class="w-full">
      <thead>
        <tr class="bg-gray-100 border-b-2 border-gray-400">
          <th></th>
          <th
            class="flex items-center"
            :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }"
          >
            <span class="underline cursor-pointer" @click="changeSortOrder">
              Ranking
            </span>
          </th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cap. de Mercado</th>
          <th>Variación 24hr</th>
          <td class="hidden sm:block">
            <input
              class="block w-full px-4 py-2 leading-normal bg-gray-100 border-b border-gray-400 appearance-none focus:outline-none"
              id="filter"
              placeholder="Buscar..."
              type="text"
              v-model="filter"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="asset in filteredAssets"
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
          <td class="text-center">
            <router-link
              :to="{ name: 'coin-detail', params: { id: asset.id } }"
            >
              {{ asset.name }}
              <small class="ml-1 text-gray-500">{{ asset.symbol }}</small>
            </router-link>
          </td>
          <td class="text-center">{{ asset.priceUsd | dolar }}</td>
          <td class="text-center">{{ asset.marketCapUsd | dolar }}</td>
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
          <td class="hidden text-center sm:block">
            <x-button @click="goToCoin(asset.id)">
              <span>Details</span>
            </x-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import xButton from '@/components/xButton'

export default {
  name: 'xAssetsTable',
  components: { xButton },
  data() {
    return {
      filter: '',
      sortOrder: 1
    }
  },
  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder === 1 ? -1 : 1

      return this.assets
        .filter(a => {
          return (
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
          )
        })
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder
          }

          return altOrder
        })
    }
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    },
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id } })
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
