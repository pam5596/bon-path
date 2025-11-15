<template>
    <v-dialog v-model="model">
        <v-card>
            <v-img :src="props.src"/>
        </v-card>
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