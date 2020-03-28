<template>
  <div>
    <x-assets-table-vue :assets="assets" />
  </div>
</template>

<script>
// Components
import xAssetsTableVue from '../components/xAssetsTable.vue'

// Utils
import api from '@/utils/api'

export default {
  name: 'Home',
  components: { xAssetsTableVue },
  data() {
    return {
      assets: []
    }
  },
  created() {
    api.getAssets().then(assets => (this.assets = assets))
  }
}
</script>
