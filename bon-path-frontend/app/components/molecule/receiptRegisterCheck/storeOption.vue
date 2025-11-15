<template>
    <v-list-item no-title>
        <template #prepend>
            <v-avatar class="avatar">
                <v-img 
                    :src="props.store.getValues.image"
                />
            </v-avatar>
        </template>
        <template #title>
            <AtomTypography>
                {{ props.store.getValues.name }}
            </AtomTypography>
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