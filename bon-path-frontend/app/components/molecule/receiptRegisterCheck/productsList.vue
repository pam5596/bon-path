<template>
    <v-list class="contents">
        <MoleculeReceiptRegisterCheckProductListItem 
            v-for="(product, index) in props.products" 
            :key="index"
            v-model="modelItem(index).value"
            :product="product"
            @delete="onRemovePurchaseEvent(index)"
        />
    </v-list>
</template>

<script setup lang="ts">
const props = defineProps<{
    products: ProductModel[]
}>()

const { form, onRemovePurchaseEvent } = useReceiptRegisterCheckViewModel()
const modelItem = (index: number) => computed({
    get: () => form.value.purchases[index],
    set: (value) => (form.value.purchases[index] = value!)
})

</script>

<style scoped>
.contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>