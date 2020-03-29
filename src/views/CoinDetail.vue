<template>
  <div class="container flex-col items-center justify-center px-5 py-5">
    <circle-loader
      :loading="isLoading"
      :color="'#2b6cb0'"
      :size="100"
      class="mx-auto"
    />

    <transition
      enter-class="ease-in opacity-0"
      enter-active-class="transition-opacity duration-500 ease-in-out"
      leave-active-class="transition-opacity duration-500 ease-in-out"
      leave-to-class="ease-out opacity-0"
    >
      <div
        v-if="!isLoading"
        class="flex flex-col flex-wrap items-center justify-around w-full sm:flex-row"
      >
        <div
          class="flex flex-col items-center w-full px-5 my-5 lg:w-1/3 lg:my-0"
        >
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl text-gray-700">
            {{ asset.name }}
            <small class="text-gray-500 sm:mr-2">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="flex flex-col w-full px-5 my-5 lg:w-1/3 lg:my-0">
          <ul>
            <li class="flex justify-between my-2">
              <b class="mr-10 text-gray-500 uppercase">ranking</b>
              <span class="font-medium text-gray-700">#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between my-2">
              <b class="mr-10 text-gray-500 uppercase">actual price</b>
              <span class="font-medium text-gray-700">{{
                asset.priceUsd | dolar
              }}</span>
            </li>
            <li class="flex justify-between my-2">
              <b class="mr-10 text-gray-500 uppercase">lowest price</b>
              <span class="font-medium text-gray-700">{{ min | dolar }}</span>
            </li>
            <li class="flex justify-between my-2">
              <b class="mr-10 text-gray-500 uppercase">highest price</b>
              <span class="font-medium text-gray-700">{{ max | dolar }}</span>
            </li>
            <li class="flex justify-between my-2">
              <b class="mr-10 text-gray-500 uppercase">average price</b>
              <span class="font-medium text-gray-700">{{ avg | dolar }}</span>
            </li>
            <li class="flex justify-between my-2">
              <b class="mr-10 text-gray-500 uppercase">24 hrs variation</b>
              <span class="font-medium text-gray-700">{{
                asset.changePercent24Hr | percent
              }}</span>
            </li>
          </ul>
        </div>

        <div
          class="flex flex-col justify-center w-full px-5 my-5 lg:w-1/3 lg:my-0"
        >
          <button
            @click="toggleConverter"
            class="px-6 py-2 font-bold text-white transition-all duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            {{ fromUsd ? `USD to ${asset.symbol}` : `${asset.symbol} to USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label for="convertValue" class="w-full">
              <input
                v-model="convertValue"
                type="number"
                id="convertValue"
                class="block w-full px-4 py-2 leading-normal text-center text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>

          <transition
            enter-class="min-h-0 ease-in opacity-0"
            enter-active-class="transition-all duration-200 ease-in-out max-h-md"
            leave-active-class="transition-all duration-200 ease-in-out max-h-md"
            leave-to-class="min-h-0 ease-out opacity-0"
          >
            <span
              v-if="convertValue > 0"
              class="text-xl text-center text-gray-700"
            >
              <b class="font-medium text-gray-500">{{
                fromUsd ? asset.symbol : '$'
              }}</b>
              {{ convertResult }}
            </span>
          </transition>
        </div>

        <div class="w-full py-4 mt-10 bg-gray-100 rounded shadow">
          <apexchart
            type="area"
            height="350"
            :options="{
              chart: {
                type: 'area',
                height: 350
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Last 24 Hours',
                align: 'center',
                style: {
                  color: '#4a5568',
                  fontSize: '24px'
                }
              },
              labels: history.map(h => [h.date]),
              xaxis: {
                type: 'datetime',
                labels: {
                  formatter: function dateFormaterChart(value, timestamp) {
                    return dateFormater(timestamp)
                  },
                  style: {
                    colors: '#a0aec0',
                    fontSize: '14px'
                  }
                }
              },
              yaxis: {
                opposite: false,
                labels: {
                  formatter: function(val) {
                    return currencyFormatter(val.toFixed(0))
                  },
                  style: {
                    colors: '#a0aec0',
                    fontSize: '14px'
                  }
                }
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
        </div>

        <h3
          class="w-full my-10 text-3xl font-semibold text-center text-gray-700"
        >
          Best Exchange Offers
        </h3>

        <div class="w-full overflow-auto bg-gray-100 rounded-md shadow">
          <table class="w-full">
            <tr
              v-for="market in markets"
              :key="`${market.exchangeId}-${market.priceUsd}`"
              class="border-b last:border-0"
            >
              <td class="p-4 text-center text-gray-700">
                <b>{{ market.exchangeId }}</b>
              </td>
              <td class="p-4 text-center text-gray-700">
                {{ market.priceUsd | dolar }}
              </td>
              <td class="p-4 text-center text-gray-500">
                {{ market.baseSymbol }} / {{ market.quoteSymbol }}
              </td>
              <td class="p-4 text-center">
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
                  class="text-center text-blue-600 transition-all duration-200 hover:underline"
                >
                  {{ market.url }}
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// Dependencies
import VueApexCharts from 'vue-apexcharts'
import { format } from 'date-fns'

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
      markets: [],
      fromUsd: true,
      convertValue: null
    }
  },
  computed: {
    convertResult() {
      if (!this.convertValue) return 0

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd

      return result.toFixed(4)
    },
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
  watch: {
    $route() {
      this.getCoin()
    }
  },
  created() {
    this.getCoin()
  },
  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd
    },
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
    },
    dateFormater(time) {
      return format(new Date(time), 'h:mm aaaa')
    },
    currencyFormatter(currency) {
      const numberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })

      return numberFormat.format(currency)
    }
  }
}
</script>
