<template>
    <v-select
        v-model="model"
        :items="props.stores"
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
const props = defineProps<{
    stores: StoreModel[]
}>()

const model = defineModel<StoreModel>()
</script>

<style scoped>

</style>