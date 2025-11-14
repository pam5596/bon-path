<template>
    <v-select
        v-model="modelProduct"
        :items="props.products"
        :list-props="{ 
            bgColor: 'white',
            class: 'd-flex flex-row ga-4',
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
                no-title
            />
        </template>
    </v-select>
</template>

<script setup lang="ts">
const props = defineProps<{
    products: ProductModel[]
}>()

const model = defineModel<PurchaseModel>()
const modelProduct = computed({
    get: () => model.value?.getValues.product,
    set: (value) => {
        model.value = new PurchaseModel({
            ...model.value!.getValues,
            product: value!
        })
    }
})

</script>

<style scoped>

</style>