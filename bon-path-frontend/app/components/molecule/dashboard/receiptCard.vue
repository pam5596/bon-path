<template>
    <div>
        <v-card>
            <v-avatar>
                <AtomDashboardReceiptImage 
                    :src="props.receipt.getValues.images[0]!.getValues.url" 
                />
            </v-avatar>
            <v-card-item>
                <AtomDashboardReceiptCreatedAt 
                    :value="new Date()"
                />
                <MoleculeDashboardReceiptCardActions />
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    receipt: ReceiptModel
}>()
</script>

<style scoped>

</style>