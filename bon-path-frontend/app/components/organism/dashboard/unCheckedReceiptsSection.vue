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
        <MoleculeDashboardReceiptsList :receipts="receipts"/>
    </section>
</template>

<script setup lang="ts">
const { receiptsFixture, receiptImagesFixture } = useFixtures()
const receipts = computed(() => receiptsFixture.map(
    (receipt) => new ReceiptModel({
        ...receipt,
        images: receiptImagesFixture.filter(
            image => image.receiptId == receipt.id
        ).map(
            image => new ReceiptImageModel(image)
        )
    })
))

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