<template>
    <TemplateEmailVerify />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: [
        'verify-session-auth'
    ]
})
</script>

<style scoped>

</style>