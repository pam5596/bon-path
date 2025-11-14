<template>
    <v-list-item>
        <MoleculeReceiptRegisterCheckProductSelector
            v-model="model"
            @search="emit('search')"
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
const emit = defineEmits(['delete', 'search'])
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

</script>

<style scoped>

</style>