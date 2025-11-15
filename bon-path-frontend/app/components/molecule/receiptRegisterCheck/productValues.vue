<template>
    <div class="contents">
        <v-number-input
            v-model="priceModel"
            :label="$t('receiptRegisterCheck.form.productValues.price.label')"
            :rules="rules.purchasePrice"
            :prefix="$t('receiptRegisterCheck.form.productValues.price.prefix')"
            variant="filled"
            control-variant="hidden"
        />
        <v-number-input
            v-model="quantityModel"
            :label="$t('receiptRegisterCheck.form.productValues.quantity.label')"
            :rules="rules.purchaseQuantity"
            :prefix="$t('receiptRegisterCheck.form.productValues.quantity.prefix')"
            variant="filled"
            control-variant="split"
        />
    </div>
</template>

<script setup lang="ts">
const { rules } = useReceiptRegisterCheckViewModel()

const priceModel = defineModel<number>('price')
const quantityModel = defineModel<number>('quantity')

</script>

<style scoped>
.contents {
    display: flex;
    gap: 1rem;
}
</style>