<template>
    <div v-if="alertContent" class="alert-overlay">
        <AtomAlert 
            :content="alertContent"
            @close="onCloseAlert"
        />
    </div>
</template>

<script setup lang="ts">
const { alertContent, onCloseAlert } = useAlert()
</script>

<style scoped>
.alert-overlay {
    position: fixed;
    top: 0;
}
</style>