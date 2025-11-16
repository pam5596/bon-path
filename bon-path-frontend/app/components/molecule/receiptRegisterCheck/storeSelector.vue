<template>
    <v-select
        v-model="storeModel"
        :items="selectItems"
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
const { form, onSearchProductEvent } = useReceiptRegisterCheckViewModel()

const storeModel = computed({
    get: () => form.value.store,
    set: async (value) => {
        form.value.store = new StoreModel({
            ...value!.getValues,
            searchResults: form.value.store?.searchResults
        })
        
        if (value?.id) {
            await Promise.all(
                form.value.purchases.map(
                    async (_, i) => await onSearchProductEvent(i)
                )
            )
        }
    }
})

const selectItems = computed(()=>Array.from(
    new Map(
        [
            ...(form.value.store?.searchResults?.google ?? []),
            ...(form.value.store?.searchResults?.vector ?? []),
        ].map(
            result => [result.getValues.name, result]
        )
    ).values()
))

</script>

<style scoped>

</style>