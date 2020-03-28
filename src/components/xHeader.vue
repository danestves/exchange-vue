<template>
  <header class="w-screen shadow">
    <nav>
      <nav class="flex flex-wrap items-center justify-between p-6 bg-green-400">
        <div class="flex items-center flex-shrink-0 mr-6 text-white">
          <x-icon class="mr-2" />
          <span class="text-xl font-semibold tracking-tight">Exchange</span>
        </div>

        <div
          class="flex-grow hidden block w-full sm:block lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow"></div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import xIcon from "@/components/xIcon";

export default {
  name: "xHeader",
  components: {
    xIcon
  }
};
</script>
