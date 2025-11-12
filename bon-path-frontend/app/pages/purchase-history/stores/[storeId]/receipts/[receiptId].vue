<template>
    <TemplatePurchaseHistoryReceipt />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: [
        'login-session-auth'
    ]
})
</script>

<style scoped>

</style>