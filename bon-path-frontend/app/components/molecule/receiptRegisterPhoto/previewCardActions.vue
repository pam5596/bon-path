<template>
    <v-card-actions class="contents">
        <v-btn 
            type="submit"
            color="primary" 
            variant="flat"
            @click="emit('click-save-receipt-and-check')"
        >
            {{ $t("receiptRegisterPhoto.previewCard.actions.toCheckBtn") }}
        </v-btn>
        <v-btn 
            type="submit"
            color="secondary" 
            variant="flat"
            @click="emit('click-save-receipt')"
        >
            {{ $t("receiptRegisterPhoto.previewCard.actions.toDashBoardBtn") }}
        </v-btn>
    </v-card-actions>
</template>

<script setup lang="ts">
const emit = defineEmits(['click-save-receipt', 'click-save-receipt-and-check'])
</script>

<style scoped>
.contents {
    display: flex;
    gap: 0.5rem;
}
</style>