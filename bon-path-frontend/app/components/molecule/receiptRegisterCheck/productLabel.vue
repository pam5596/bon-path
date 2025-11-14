<template>
    <div class="contents">
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
.contents {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>