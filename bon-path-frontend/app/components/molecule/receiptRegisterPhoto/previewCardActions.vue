<template>
    <v-card-actions class="card-actions">
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
.card-actions {
    display: flex;
    gap: 0.5rem;
}
</style>