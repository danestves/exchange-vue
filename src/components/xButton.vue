<template>
  <button
    @click="buttonClick"
    class="flex items-center px-6 py-2 mx-auto font-semibold text-blue-600 transition-all duration-200 border border-blue-600 rounded shadow outline-none focus:shadow-outline hover:bg-blue-600 hover:text-white"
  >
    <slot v-show="isLoading" />
    <beat-loader
      :loading="isLoading"
      :color="'#ffffff'"
      :size="8"
      class="mr-1"
    />
  </button>
</template>

<script>
export default {
  name: 'xButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit('click')
    }
  }
}
</script>
