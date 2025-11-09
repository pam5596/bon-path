<template>
    <div class="label">
        <AtomReceiptRegisterCheckProductAvatar 
            :src="props.product.getValues.image!"
        />
        <AtomTypography>
            {{ props.product.getValues.name }}
        </AtomTypography>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: ProductModel
}>()
</script>

<style scoped>
.label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>