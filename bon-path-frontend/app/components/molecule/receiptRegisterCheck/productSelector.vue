<template>
    <v-select
        v-model="select"
        :items="props.products"
        :list-props="{ 
            bgColor: 'white',
            class: 'd-flex flex-column pd-10',
        }"
    >
        <template #selection="{ item }">
            <MoleculeReceiptRegisterCheckProductLabel 
                :product="item.value"
            />
        </template>
        <template #item="{ props: itemProps, item }">
            <MoleculeReceiptRegisterCheckProductOption
                v-bind="itemProps"
                :product="item.value"
            />
        </template>
    </v-select>
</template>

<script setup lang="ts">
const props = defineProps<{
    products: ProductModel[]
}>()
const select = shallowRef(props.products[0])

</script>

<style scoped>

</style>