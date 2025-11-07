<template>
    <v-card-actions class="actions">
        <v-btn>
            {{  $t("purchaseHistoryStores.cardActions.toReceiptsBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">

</script>

<style scoped>
.actions {
    flex-direction: column;
    align-items: end;
    padding: 0;
    min-height: auto;
}
</style>