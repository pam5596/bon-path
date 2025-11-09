<template>
    <v-card-actions class="contents">
        <v-btn color="primary" variant="flat" width="70%">
            {{ $t("dashboard.unCheckedReceiptsSection.receiptCard.actions.toCheckBtn") }}
        </v-btn>
        <v-btn color="error" variant="outlined" width="70%">
            {{ $t("dashboard.unCheckedReceiptsSection.receiptCard.actions.onDeleteBtn") }}
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