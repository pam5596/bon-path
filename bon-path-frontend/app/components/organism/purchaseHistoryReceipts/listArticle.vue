<template>
    <article>
        <AtomTypography class="text-h6">
            {{ store.getValues.name }}
        </AtomTypography>
        <MoleculePurchaseHistoryReceiptsList 
            :receipts="receipts"
        />
    </article>
</template>

<script setup lang="ts">
const { storesFixture, purchasesFixture, receiptsFixture, receiptImagesFixture } = useFixtures()
const { storeId } = useIdParams(['storeId'])

const store = computed(()=>new StoreModel(storesFixture.find(
    store => store.id == storeId
)!))

const receipts = computed(()=>purchasesFixture.filter(
    purchase => purchase.storeId == storeId
).map(
    purchase => new ReceiptModel({
        ...receiptsFixture.find(receipt => receipt.id == purchase.receiptId)!,
        images: receiptImagesFixture.filter(
            image => image.receiptId == purchase.receiptId
        ).map(
            image => new ReceiptImageModel(image)
        )
    })
))

</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>