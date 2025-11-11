<template>
    <v-card class="content">
        <v-avatar class="avatar">
            <AtomDashboardReceiptImage
                :src="props.receipt.images[0]!.getValues.url"
            />
        </v-avatar>
        <v-card-item class="item">
            <AtomDashboardReceiptCreatedAt 
                :value="props.receipt.getValues.createdAt!"
            />
            <MoleculeDashboardReceiptCardActions 
                @click-delete-receipt="emit('click-delete-receipt')"
                @click-navigate-to-check="emit('click-navigate-to-check')"
            />
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipt: ReceiptModel
}>()

const emit = defineEmits(['click-navigate-to-check', 'click-delete-receipt'])

</script>

<style scoped>
.content {
    max-height: 8rem;
    display: flex;
    flex-direction: row;
}

.avatar {
    height: auto;
    object-fit: cover;
    border-radius: 0;
    width: 30%;
}

.item {
    width: 70%;
    padding: 0.5rem;
}
</style>