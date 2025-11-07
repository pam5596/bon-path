<template>
    <v-card class="contents">
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
.contents {
    height: 8rem;
    display: flex;
    justify-content: space-between;
}

.avatar {
    height: auto;
    object-fit: cover;
    border-radius: 0;
    min-width: 30%;

}

.item {
    min-width: 70%;
    padding: 0.5rem;
}
</style>