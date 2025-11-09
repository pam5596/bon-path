<template>
    <div class="wrapper">
        <v-text-field
            v-model="purchaseValues.price"
            :label="$t('receiptRegisterCheck.form.productValues.price.label')"
            type="number"
            :rules="[(v: unknown) => !!v || $t('receiptRegisterCheck.form.productValues.price.required')]"
            :prefix="$t('receiptRegisterCheck.form.productValues.price.prefix')"
        />
        <v-text-field
            v-model="purchaseValues.quantity"
            :label="$t('receiptRegisterCheck.form.productValues.quantity.label')"
            type="number"
            :rules="[(v: unknown) => !!v || $t('receiptRegisterCheck.form.productValues.quantity.required')]"
            :prefix="$t('receiptRegisterCheck.form.productValues.quantity.prefix')"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    purchase: PurchaseModel
}>()

const purchaseValues = reactive({
    price: props.purchase.getValues.price,
    quantity: props.purchase.getModelValues.quantity
})
</script>

<style scoped>
.wrapper {
    display: flex;
    gap: 1rem;
}
</style>