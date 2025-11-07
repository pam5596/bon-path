<template>
    <v-card class="card">
        <v-avatar class="avatar">
            <AtomDashboardReceiptImage
                :src="props.receipt.images[0]!.getValues.url"
            />
        </v-avatar>
        <v-card-item class="item">
            <AtomDashboardReceiptCreatedAt 
                :value="new Date()"
            />
            <MoleculeDashboardReceiptCardActions />
        </v-card-item>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipt: ReceiptModel
}>()
</script>

<style scoped>
.card {
    height: 8rem;
    display: flex;
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