<template>
  <main>
    <x-header />

    <router-view class="container flex justify-center px-5 py-20 sm:px-20" />
  </main>
</template>

<script>
import xHeader from "@/components/xHeader";

export default {
  name: "App",
  components: {
    xHeader
  }
};
</script>
