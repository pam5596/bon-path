<template>
    <section>
        <AtomTypography class="title">
            <v-icon>
                mdi-information-slab-box
            </v-icon>
            <span>
                {{ $t('dashboard.unCheckedReceiptsSection.heading') }}
            </span>
        </AtomTypography>
        <MoleculeDashboardReceiptsList 
            :receipts="data?.receipts"
            @click-delete-receipt="onDeleteReceiptEvent"
            @click-navigate-to-check="toReceiptRegisterCheck"
        />
    </section>
</template>

<script setup lang="ts">
const { data, onDeleteReceiptEvent, toReceiptRegisterCheck } = useDashboardViewModel()

</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.title {
    font-size: 1.25rem;
}
</style>