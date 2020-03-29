<template>
  <main>
    <x-header />

    <router-view />
  </main>
</template>

<script>
import xHeader from '@/components/xHeader'

export default {
  name: 'App',
  components: {
    xHeader
  }
}
</script>
