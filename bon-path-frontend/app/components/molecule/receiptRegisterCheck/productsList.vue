<template>
    <v-list class="contents">
        <MoleculeReceiptRegisterCheckProductListItem 
            v-for="(_, index) in form.purchases" 
            :key="index"
            v-model="modelItem(index).value"
            @delete="onRemovePurchaseEvent(index)"
            @search="onSearchProductEvent(index)"
        />
    </v-list>
</template>

<script setup lang="ts">
const { form, onRemovePurchaseEvent, onSearchProductEvent } = useReceiptRegisterCheckViewModel()

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