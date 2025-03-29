<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProductCom 
            v-for="product in products" 
            :key="product.id" 
            :product="product"
        />
    </div>
</template>

<script setup>

import { ref } from 'vue';

// Reactive state
const products = ref([]);

// Fetch products
const { data } = await useFetch('/api/products');
if (data.value) {
    products.value = data.value;
}

</script>
