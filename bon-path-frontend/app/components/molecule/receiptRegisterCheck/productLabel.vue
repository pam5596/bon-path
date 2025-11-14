<template>
    <div class="contents">
        <AtomReceiptRegisterCheckProductAvatar 
            :src="props.product.getValues.image"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: ProductModel
}>()
</script>

<style scoped>
.contents {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>