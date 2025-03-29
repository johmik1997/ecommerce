<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search Input -->
    <div class="max-w-2xl mx-auto mb-12">
      <form class="flex items-center" @submit.prevent>
        <label for="product-search" class="sr-only">Search products</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            v-model="searchInput"
            type="text"
            id="product-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for products..."
          />
          <button
            v-if="searchInput"
            @click="clearSearch"
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 text-red-600">
      {{ error }}
    </div>

    <!-- Results Grid -->
    <div v-else>
      <div v-if="searchInput && searchResults.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCom v-for="product in searchResults" :key="product.id" :product="product" />
      </div>

      <!-- Empty State -->
      <div v-else-if="searchInput && !searchResults.length" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400 text-lg">No products found for "{{ searchInput }}"</p>
        <button @click="clearSearch" class="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Clear search</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useFetch } from '#app';

const searchInput = ref('');
const searchResults = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Watch for changes in search input and fetch results
watch(searchInput, async (newQuery) => {
  if (!newQuery.trim()) {
    searchResults.value = [];
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const { data } = await useFetch('/api/products/search/query', {
      query: { input: newQuery },
    });
    searchResults.value = data.value || [];
  } catch (err) {
    error.value = 'Failed to fetch products. Please try again.';
  } finally {
    isLoading.value = false;
  }
}, { debounce: 300 });

// Clear search
const clearSearch = () => {
  searchInput.value = '';
  searchResults.value = [];
  error.value = null;
};
</script>
