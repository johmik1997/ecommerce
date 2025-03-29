<template>
  <div :class="[colorMode, 'min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white']">
    <Header />
    <main class="flex-grow container mx-auto p-4">
      <slot />
    </main>
    <footer class="bg-gray-200 dark:bg-gray-800 text-center p-4">

      <p class="text-sm mt-2">&copy; 2025 Gebeya. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useColorMode } from '@vueuse/core';

const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>
