<template>
  <div class="flex-col items-center">
    <template v-if="asset.id">
      <div class="flex flex-col items-center justify-around w-full sm:flex-row">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="text-gray-500 sm:mr-2">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="flex flex-col my-10">
          <ul>
            <li class="flex justify-between">
              <b class="mr-10 text-gray-600 uppercase">ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="mr-10 text-gray-600 uppercase">actual price</b>
              <span>{{ asset.priceUsd | dolar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="mr-10 text-gray-600 uppercase">lowest price</b>
              <span>{{ min | dolar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="mr-10 text-gray-600 uppercase">highest price</b>
              <span>{{ max | dolar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="mr-10 text-gray-600 uppercase">average price</b>
              <span>{{ avg | dolar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="mr-10 text-gray-600 uppercase">24 hrs variation</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col justify-center my-10 sm:mt-0 textcenter">
          <button
            class="px-6 py-2 font-bold text-white transition-all duration-200 bg-blue-700 rounded hover:bg-blue-900"
          >
            Change
          </button>

          <div class="flex flex-row my-5">
            <label for="convertValue" class="w-full">
              <input
                type="number"
                id="convertValue"
                class="block w-full px-4 py-2 leading-normal text-center transition-all duration-200 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Utils
import { getAsset, getAssetHistory } from '@/utils/api'

export default {
  name: 'CoinDetail',
  data() {
    return {
      asset: {},
      history: []
    }
  },
  computed: {
    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },
    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },
    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    }
  },
  created() {
    this.getCoin()
  },
  methods: {
    getCoin() {
      const id = this.$route.params.id

      return Promise.all([getAsset(id), getAssetHistory(id)]).then(
        ([asset, history]) => {
          this.asset = asset
          this.history = history
        }
      )
    }
  }
}
</script>