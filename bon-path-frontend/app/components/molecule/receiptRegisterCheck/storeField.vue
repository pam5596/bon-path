<template>
    <div class="contents">
        <AtomTypography class="text-h6">
            {{ $t("receiptRegisterCheck.form.storeHeading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterCheckStoreSelector 
            v-model="storeModel"
            :stores="props.stores"
        />
    </div>
</template>

<script setup lang="ts">
const { form } = useReceiptRegisterCheckViewModel()

const props = defineProps<{
    stores: StoreModel[]
}>()

const storeModel = computed({
    get: () => form.value.store,
    set: (value) => (form.value.store = value)
})

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>