<template>
    <div>
        <Loading v-if="pending" />
        <ProductCom v-else :product="product" />
    </div>
</template>

<script setup>
    const route=useRoute()
    const id=route.params.id

    const {data:product,pending}=await useFetch(`/api/products/find-products-by-id/${id}`)

</script>