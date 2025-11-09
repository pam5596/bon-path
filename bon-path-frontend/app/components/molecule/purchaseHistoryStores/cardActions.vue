<template>
    <v-card-actions class="contents">
        <v-btn color="primary" variant="flat">
            {{  $t("purchaseHistoryStores.cardActions.toReceiptsBtn") }}
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