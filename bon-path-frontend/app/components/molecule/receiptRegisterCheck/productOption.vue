<template>
    <v-list-item>
        <template #prepend>
            <v-avatar class="avatar">
                <v-img 
                    :src="props.product.getValues.image"
                />
            </v-avatar>
        </template>
        <template #title>
            {{ props.product.getValues.name }}
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: ProductModel
}>()
</script>

<style scoped>
.avatar {
    border-radius: 0;
}
</style>