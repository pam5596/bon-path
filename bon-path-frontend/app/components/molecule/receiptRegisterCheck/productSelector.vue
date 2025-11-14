<template>
    <div class="content">
        <v-select
            v-model="modelProduct"
            class="select"
            :items="props.products"
            :list-props="{ 
                bgColor: 'white',
                class: 'd-flex flex-row',
            }"
            icon-color="transparent"
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
        <v-text-field
            v-model="modelProductName"
            :label="$t('receiptRegisterCheck.form.productSelector.name.label')"
            class="text-field"
            variant="filled"
            :rules="[(v: unknown) => !!v || $t('receiptRegisterCheck.form.productSelector.name.required')]"
        />
    </div>
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
const modelProductName = computed({
    get: () => model.value!.product.getValues.name,
    set: (value) => {
        model.value = new PurchaseModel({
            ...model.value!.getValues,
            product: new ProductModel({
                ...model.value!.product.getValues,
                name: value
            })
        })
    }
})


</script>

<style scoped>
.content {
    display: flex;
    gap: 1rem;
}

.select {
    width: 30%;
}

.text-field {
    width: 80%
}

</style>