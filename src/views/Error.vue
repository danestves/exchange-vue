<template>
  <div class="flex-col items-center">
    <h1 class="text-4xl text-gray-700">
      You just hit a route that doesn’t exist… the sadness.
    </h1>

    <router-link
      to="/"
      class="px-6 py-2 mt-5 font-bold text-blue-700 transition-all duration-200 border border-blue-700 rounded-md hover:bg-blue-700 hover:text-white"
    >
      Back to Home
    </router-link>
  </div>
</template>
