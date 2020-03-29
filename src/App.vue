<template>
  <main>
    <x-header />

    <transition
      enter-class="ease-in opacity-0"
      enter-active-class="transition-opacity duration-500 ease-in-out"
      leave-active-class="transition-opacity duration-500 ease-in-out"
      leave-to-class="ease-out opacity-0"
    >
      <router-view />
    </transition>

    <x-footer />
  </main>
</template>

<script>
// Components
import xHeader from '@/components/xHeader'
import xFooter from '@/components/xFooter'

export default {
  name: 'App',
  components: {
    xHeader,
    xFooter
  }
}
</script>
