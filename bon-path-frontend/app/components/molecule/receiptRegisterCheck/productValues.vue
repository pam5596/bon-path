<template>
    <div class="contents">
        <v-number-input
            v-model="priceModel"
            :label="$t('receiptRegisterCheck.form.productValues.price.label')"
            :rules="[(v: unknown) => !!v || $t('receiptRegisterCheck.form.productValues.price.required')]"
            :prefix="$t('receiptRegisterCheck.form.productValues.price.prefix')"
            variant="filled"
            control-variant="hidden"
        />
        <v-number-input
            v-model="quantityModel"
            :label="$t('receiptRegisterCheck.form.productValues.quantity.label')"
            :rules="[(v: unknown) => !!v || $t('receiptRegisterCheck.form.productValues.quantity.required')]"
            :prefix="$t('receiptRegisterCheck.form.productValues.quantity.prefix')"
            variant="filled"
            control-variant="split"
        />
    </div>
</template>

<script setup lang="ts">
const priceModel = defineModel<number>('price')
const quantityModel = defineModel<number>('quantity')

</script>

<style scoped>
.contents {
    display: flex;
    gap: 1rem;
}
</style>