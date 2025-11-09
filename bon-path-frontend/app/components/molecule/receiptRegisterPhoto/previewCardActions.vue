<template>
    <v-card-actions class="contents">
        <v-btn>
            {{ $t("receiptRegisterPhoto.previewCard.actions.toCheckBtn") }}
        </v-btn>
        <v-btn>
            {{ $t("receiptRegisterPhoto.previewCard.actions.toDashBoardBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">

</script>

<style scoped>
.contents {
    display: flex;
    gap: 0.5rem;
}
</style>