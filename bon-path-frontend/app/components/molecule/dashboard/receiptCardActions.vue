<template>
    <v-card-actions class="contents">
        <v-btn 
            color="primary" 
            variant="flat" 
            width="70%"
            @click="emit('click-navigate-to-check')"
        >
            {{ $t("dashboard.unCheckedReceiptsSection.receiptCard.actions.toCheckBtn") }}
        </v-btn>
        <v-btn 
            color="error" 
            variant="outlined" 
            width="70%"
            @click="emit('click-delete-receipt')"
        >
            {{ $t("dashboard.unCheckedReceiptsSection.receiptCard.actions.onDeleteBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">
const emit = defineEmits(['click-navigate-to-check', 'click-delete-receipt'])

</script>

<style scoped>
.contents {
    flex-direction: column;
    align-items: end;
}
</style>