<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex justify-center w-full pt-4">
    <nav class="max-w-6xl">
      <div class="flex flex-row flex-wrap justify-center gap-2">
        <RouterLink
          to="/"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >Home</RouterLink
        >
        <RouterLink
          to="/botanicals"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >Botanicals</RouterLink
        >
        <RouterLink
          to="/flora"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >Flora</RouterLink
        >
        <RouterLink
          to="/house"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >House Portraits</RouterLink
        >
        <RouterLink
          to="/italy"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >Italy</RouterLink
        >
        <RouterLink
          to="/sanfran"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >San Francisco</RouterLink
        >
        <RouterLink
          to="/roads"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >Other Roads Travelled</RouterLink
        >
        <RouterLink
          to="/about"
          class="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2"
          >About</RouterLink
        >
      </div>
    </nav>
  </header>

  <RouterView class="m-6" />
</template>

<style scoped></style>
