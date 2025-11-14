<template>
    <v-list-item no-title>
        <v-avatar class="avatar" size="150">
            <v-img 
                :src="props.product.getValues.image"
            />
        </v-avatar>
        <template #title>
            <span />
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