<template>
    <v-dialog v-model="dialogIsOpen">
        <AtomAlert 
            :content="alertContent"
            @close="onCloseAlert"
        />
    </v-dialog>
</template>

<script setup lang="ts">
const { dialogIsOpen, alertContent, onCloseAlert } = useAlert()
</script>

<style scoped>

</style>