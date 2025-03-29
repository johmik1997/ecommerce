<template>
    <div class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        loading...
      </div>
    </div>
  </template>
  
  <script setup>
    // Optional: If you want to control when this loading state is shown dynamically, you can manage the state via a reactive variable.
    const isLoading = true;  // Replace with your dynamic loading state if needed.
  </script>
  
  <style scoped>
    /* Scoped styles to adjust loading appearance if necessary */
    .animate-pulse {
      animation: pulse 1s infinite;
    }
  
    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  </style>
  