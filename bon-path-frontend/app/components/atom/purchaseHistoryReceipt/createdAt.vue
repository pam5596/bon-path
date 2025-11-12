<template>
    <v-card-subtitle class="content">
        {{ createdAt }}
    </v-card-subtitle>
</template>

<script setup lang="ts">
const props = defineProps<{
    value?: Date
}>()
const createdAt = computed(()=>props.value?.toLocaleString())

</script>

<style scoped>
.content {
    text-align: right;
}
</style>