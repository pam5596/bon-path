<template>
    <div class="label">
        <AtomReceiptRegisterCheckStoreAvatar 
            :src="props.store.getValues.image!"
        />
        <AtomTypography>
            {{ props.store.getValues.name }}
        </AtomTypography>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    store: StoreModel
}>()
</script>

<style scoped>
.label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>