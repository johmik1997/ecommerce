<template>
    <div :id="`product-${product.id}`" class=" justify-between  items-center mt-5 ml-5 h-full  flex">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <NuxtLink :to="`/product-${product.id}`" class="flex-grow">
                <img class="p-8 rounded-t-lg w-full h-48 object-contain" :src="product.image" :alt="product.title" />
            </NuxtLink>
            <div class="px-5 pb-5 flex flex-col flex-grow">
                <NuxtLink :to="`/product/${product.id}`">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                        {{ product.title }}
                    </h5>
                </NuxtLink>
                <NuxtLink :to="`/product/${product.id}`" class="mt-2">
                    <p class="text-gray-500 dark:text-gray-400 line-clamp-3">
                        {{ product.description }}
                    </p>
                </NuxtLink>
                
                <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center">
    <UIcon 
      v-for="i in 5"
      :key="i"
      name="i-lucide-star"
      :class="[
        i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-500',
        'size-5'
      ]"
      aria-hidden="true"
    />
  
        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                            {{ rating.toFixed(1) }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-auto">
                    <div class="flex flex-col">
                        <span class="text-3xl font-bold text-gray-900 dark:text-white">
                            ${{ product.price.toFixed(2) }}
                        </span>
                        <span class="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${{ (product.price * 1.5).toFixed(2) }}
                        </span>
                    </div>
                    <button 
                        @click="addToCart(product)" 
                        :disabled="isInCart"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        :class="{'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800': isInCart}">
                        {{ isInCart ? 'Added to Cart' : 'Add to Cart' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const user = useSupabaseUser()
const cart = useCart()
const getRandomRating = () => {
    return Math.random() * 2 + 3 // Returns rating between 3.0-5.0
}
const rating = ref(getRandomRating())
const isInCart = computed(() => cart.value?.some(item => item.id === props.product.id))



const addToCart = (product) => {
    if (!user.value) {
        return navigateTo('/login?redirect=' + encodeURIComponent(`/product/${product.id}`))
    }
    
    if (!isInCart.value) {
        cart.value = [...cart.value, product]
    }
}
</script>