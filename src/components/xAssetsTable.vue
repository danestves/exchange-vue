<template>
  <div class="w-full overflow-auto bg-gray-100 rounded-md shadow">
    <table class="w-full">
      <thead>
        <tr class="text-gray-700 bg-gray-100 border-b border-gray-400">
          <th class="hidden md:table-cell"></th>
          <th
            class="hidden text-center md:table-cell"
            :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }"
          >
            <span class="underline cursor-pointer" @click="changeSortOrder">
              Ranking
            </span>
          </th>
          <th class="text-center">Name</th>
          <th class="text-center">Price</th>
          <th class="hidden text-center md:table-cell">Market Cap</th>
          <th class="text-center">24 hr Variation</th>
          <td class="hidden md:table-cell">
            <input
              class="block w-full px-4 py-2 leading-normal bg-gray-100 appearance-none focus:outline-none"
              id="filter"
              placeholder="Search..."
              type="text"
              v-model="filter"
            />
          </td>
        </tr>
      </thead>
      <transition-group
        enter-class="ease-in opacity-0"
        enter-active-class="transition-all duration-500 ease-in-out"
        leave-active-class="transition-all duration-500 ease-in-out"
        leave-to-class="ease-out opacity-0"
        move-class="transition-transform duration-700"
        tag="tbody"
      >
        <tr
          v-for="asset in filteredAssets"
          :key="asset.id"
          class="transition duration-200 border-b border-gray-300 last:border-0 hover:bg-blue-100"
        >
          <td class="hidden text-center md:table-cell">
            <img
              class="block w-12 h-12 mx-auto"
              v-lazy="
                `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
              "
              :alt="asset.name"
            />
          </td>
          <td class="hidden p-4 text-center md:table-cell">
            <b class="text-gray-700"># {{ asset.rank }}</b>
          </td>
          <td class="p-4 text-center">
            <router-link
              :to="{ name: 'coin-detail', params: { id: asset.id } }"
            >
              {{ asset.name }}
              <small class="ml-1 text-gray-500">{{ asset.symbol }}</small>
            </router-link>
          </td>
          <td class="p-4 text-center">{{ asset.priceUsd | dolar }}</td>
          <td class="hidden p-4 text-center md:table-cell">
            {{ asset.marketCapUsd | dolar }}
          </td>
          <td
            class="p-4 text-center"
            :class="
              parseFloat(asset.changePercent24Hr) < 0.0
                ? 'text-red-600'
                : 'text-green-600'
            "
          >
            <svg fill="currentColor" viewBox="0 0 20 20" class="inline w-6 h-6">
              <path
                v-if="parseFloat(asset.changePercent24Hr) < 0.0"
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>

              <path
                v-if="parseFloat(asset.changePercent24Hr) > 0.0"
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ asset.changePercent24Hr | percent }}
          </td>
          <td class="hidden p-4 text-center md:table-cell">
            <x-button @click="goToCoin(asset.id)">
              <span>Details</span>
            </x-button>
          </td>
        </tr>
      </transition-group>
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
