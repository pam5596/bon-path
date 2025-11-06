<template>
    <section>
        <AtomTypography>
            {{ $t('dashboard.unCheckedReceiptsSection.heading') }}
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

</style>