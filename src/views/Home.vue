<template>
  <div class="container flex justify-center px-5 py-20">
    <circle-loader :loading="isLoading" :color="'#2b6cb0'" :size="100" />
    <x-assets-table-vue v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
// Components
import xAssetsTableVue from '../components/xAssetsTable.vue'

// Utils
import { getAssets } from '@/utils/api'

export default {
  name: 'Home',
  components: { xAssetsTableVue },
  data() {
    return {
      isLoading: true,
      assets: []
    }
  },
  created() {
    getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false))
  }
}
</script>
