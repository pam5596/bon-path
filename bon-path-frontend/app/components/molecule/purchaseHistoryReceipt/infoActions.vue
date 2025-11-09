<template>
    <v-card-actions class="contents">
        <v-btn color="error" variant="outlined">
            {{ $t("purchaseHistoryReceipt.infoActions.onDeleteBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">

</script>

<style scoped>
.contents {
    flex-direction: column;
    align-items: end;
}
</style>