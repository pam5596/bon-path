<template>
    <v-list-item>
        <template #prepend>
            <v-avatar class="avatar">
                <v-img 
                    :src="props.store.getValues.image"
                />
            </v-avatar>
        </template>
        <template #title>
            {{ props.store.getValues.name }}
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    store: StoreModel
}>()
</script>

<style scoped>
.avatar {
    border-radius: 0;
}
</style>