<template>
  <button
    @click="buttonClick"
    class="px-6 py-2 font-semibold text-blue-600 transition-all duration-200 border border-blue-600 rounded shadow outline-none focus:shadow-outline hover:bg-blue-600 hover:text-white"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'xButton',
  methods: {
    buttonClick() {
      this.$emit('click')
    }
  }
}
</script>
