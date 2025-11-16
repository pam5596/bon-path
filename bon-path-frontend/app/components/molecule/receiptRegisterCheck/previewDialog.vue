<template>
    <v-dialog v-model="model">
        <template #default="{ isActive }">
            <v-card 
                @click="isActive.value = false"
            >
                <v-img 
                    :src="props.src" 
                />
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    src?: string
}>()

const model = defineModel({ type: Boolean })

</script>

<style scoped>

</style>