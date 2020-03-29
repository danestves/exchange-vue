<template>
  <div class="container flex-col items-center justify-center px-5 py-20">
    <circle-loader
      :loading="isLoading"
      :color="'#2b6cb0'"
      :size="100"
      class="mx-auto"
    />

    <template v-if="!isLoading">
      <div
        class="flex flex-col flex-wrap items-center justify-around w-full sm:flex-row"
      >
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
            class="px-6 py-2 font-bold text-white transition-all duration-200 bg-blue-600 rounded hover:bg-blue-700"
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

        <apexchart
          type="area"
          height="350"
          class="w-full"
          :options="{
            chart: {
              type: 'area',
              height: 350,
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Fundamental Analysis of Stocks',
              align: 'left'
            },
            subtitle: {
              text: 'Price Movements',
              align: 'left'
            },
            labels: history.map(h => [h.date]),
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              opposite: true
            },
            legend: {
              horizontalAlign: 'left'
            }
          }"
          :series="[
            {
              name: 'STOCK ABC',
              data: history.map(h => [
                h.date,
                parseFloat(h.priceUsd).toFixed(2)
              ])
            }
          ]"
        ></apexchart>

        <h3 class="w-full my-10 text-xl">Best Exchange Offers</h3>

        <table class="w-full">
          <tr
            v-for="market in markets"
            :key="`${market.exchangeId}-${market.priceUsd}`"
            class="border-b"
          >
            <td>
              <b>{{ market.exchangeId }}</b>
            </td>
            <td>
              {{ market.priceUsd | dolar }}
            </td>
            <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
            <td>
              <x-button
                :is-loading="market.isLoading || false"
                v-if="!market.url"
                @click="getWebsite(market)"
              >
                <slot>Obtain link</slot>
              </x-button>
              <a
                v-else
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 transition-all duration-200 hover:underline"
              >
                {{ market.url }}
              </a>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
// Dependencies
import VueApexCharts from 'vue-apexcharts'

// Components
import xButton from '@/components/xButton'

// Utils
import { getAsset, getAssetHistory, getMarkets, getExchange } from '@/utils/api'

export default {
  name: 'CoinDetail',
  components: {
    apexchart: VueApexCharts,
    xButton
  },
  data() {
    return {
      isLoading: true,
      asset: {},
      history: [],
      markets: []
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

      return Promise.all([getAsset(id), getAssetHistory(id), getMarkets(id)])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
        .finally(() => (this.isLoading = false))
    },
    getWebsite(exchange) {
      this.$set(exchange, 'isLoading', true)

      return getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, 'url', res.exchangeUrl)
        })
        .finally(() => this.$set(exchange, 'isLoading', false))
    }
  }
}
</script>
