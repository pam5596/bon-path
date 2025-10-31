<template>
    <v-alert
        :type="props.content?.type"
        :title="props.content?.title"
        :text="props.content?.text"
        closable
        @click:close="emit('close')"
    >
        <pre>
            {{ props.content?.forDeveloper }}
        </pre>
    </v-alert>
</template>

<script setup lang="ts">
const props = defineProps<{
    content: STATE_TYPES['ALERT'],
}>()
const emit = defineEmits(['close'])

</script>

<style scoped>

</style>