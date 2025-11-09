<template>
    <article>
        <AtomTypography>
            {{  $t("receiptRegisterPhoto.descriptionArticle.heading") }}
        </AtomTypography>
        <MoleculeReceiptRegisterPhotoDescriptionList />
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>