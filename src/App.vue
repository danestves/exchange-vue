<template>
  <main>
    <x-header />
    <x-assets-table-vue />
  </main>
</template>

<script>
import xHeader from "@/components/xHeader";
import xAssetsTableVue from "./components/xAssetsTable.vue";

export default {
  name: "App",
  components: {
    xHeader,
    xAssetsTableVue
  }
};
</script>
