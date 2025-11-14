<template>
    <div class="content">
        <v-select
            v-model="modelProductImage"
            :label="$t('receiptRegisterCheck.form.productSelector.image.label')"
            class="select"
            :items="selectItems"
            :list-props="{ 
                bgColor: 'white',
                class: 'd-flex flex-row',
            }"
        > 
            <template #selection="{ item }">
                <AtomReceiptRegisterCheckProductAvatar 
                    :src="item.value"
                />
            </template>
            <template #item="{ props: itemProps, item }">
                <MoleculeReceiptRegisterCheckProductOption
                    v-bind="itemProps"
                    :src="item.value"
                    no-title
                />
            </template>
        </v-select>
        <v-text-field
            v-model="modelProductName"
            :label="$t('receiptRegisterCheck.form.productSelector.name.label')"
            variant="filled"
            append-inner-icon="mdi-image-search"
            :rules="[(v: unknown) => !!v || $t('receiptRegisterCheck.form.productSelector.name.required')]"
            @click:append-inner="emit('search')"
        />
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])

const model = defineModel<PurchaseModel>()
const modelProductImage = computed({
    get: () => model.value?.product.getValues.image,
    set: (value) => {
        const target = model.value!.product.searchResults?.find(
            result => result.image == value
        )

        model.value = new PurchaseModel({
            ...model.value!.getValues,
            product: new ProductModel({
                ...model.value!.product.getValues,
                image: value,
                name: target?.id ? target.name : model.value!.product.getValues.name
            })
        })
    }
})
const selectItems = computed(()=>model.value?.product.searchResults?.map(
    result => result.image
))

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
    flex-direction: column;
}

.select :deep(.v-field__input) {
    justify-content: center !important;
}

</style>