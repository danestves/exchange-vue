<template>
  <header class="w-screen bg-blue-600 shadow">
    <nav class="container px-5">
      <nav class="flex flex-wrap items-center justify-between px-5 py-4">
        <router-link
          :to="{ name: 'home' }"
          class="flex items-center flex-shrink-0 mr-6 text-white"
        >
          <x-icon class="mr-2" />
          <span class="text-xl font-semibold tracking-tight">Exchange</span>
        </router-link>

        <div class="flex items-center flex-grow">
          <div class="w-full text-right">
            <router-link
              :to="{ name: 'about' }"
              class="px-6 py-3 text-white transition duration-200 rounded hover:bg-blue-700"
            >
              About
            </router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
// Components
import xIcon from '@/components/xIcon'

export default {
  name: 'xHeader',
  components: {
    xIcon
  }
}
</script>
