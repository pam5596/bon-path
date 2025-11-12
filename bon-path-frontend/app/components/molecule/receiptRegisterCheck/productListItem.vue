<template>
    <v-list-item>
        <MoleculeReceiptRegisterCheckProductSelector
            v-model="model"
            :products="props.product.searchResults!"
        />
        <MoleculeReceiptRegisterCheckProductValues 
            v-model:price="modelPrice"
            v-model:quantity="modelQuantity"
        />
        <v-btn 
            color="error" 
            variant="outlined" 
            width="100%"
            @click="emit('delete')"
        >
            {{ $t("receiptRegisterCheck.form.onRemovePurchaseBtn") }}
        </v-btn>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: ProductModel
}>()

const model = defineModel<PurchaseModel>()
const modelPrice = computed({
    get: () => model.value?.getModelValues.price,
    set: (value) => {
        model.value = new PurchaseModel({
            ...model.value!.getValues,
            price: value!
        })
    }
})
const modelQuantity = computed({
    get: () => model.value?.getModelValues.quantity,
    set: (value) => {
        model.value = new PurchaseModel({
            ...model.value!.getValues,
            quantity: value!
        })
    }
})

const emit = defineEmits(['delete'])

</script>

<style scoped>

</style>