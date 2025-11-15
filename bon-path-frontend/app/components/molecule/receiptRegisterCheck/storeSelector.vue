<template>
    <v-select
        v-model="storeModel"
        :items="form.store?.searchResults"
        :list-props="{ 
            bgColor: 'white',
            class: 'd-flex flex-column pd-10',
        }"
    >
        <template #selection="{ item }">
            <MoleculeReceiptRegisterCheckStoreLabel 
                :store="item.value"
            />
        </template>
        <template #item="{ props: itemProps, item }">
            <MoleculeReceiptRegisterCheckStoreOption 
                v-bind="itemProps"
                :store="item.value"
            /> 
        </template>
    </v-select>
</template>

<script setup lang="ts">
const { form } = useReceiptRegisterCheckViewModel()

const storeModel = computed({
    get: () => form.value.store,
    set: (value) => (form.value.store = new StoreModel({
        ...value!.getValues,
        searchResults: form.value.store?.searchResults
    }))
})

</script>

<style scoped>

</style>