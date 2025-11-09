<template>
    <div v-if="alertContent" class="wrapper">
        <v-alert
            :type="alertContent.type"
            :title="alertContent.title"
            :text="alertContent.text"
            closable
            @click:close="onCloseAlert"
        >   
            <MoleculeAlertCaption 
                :content="alertContent.forDeveloper"
            />
        </v-alert>
    </div>
</template>

<script setup lang="ts">
const { alertContent, onCloseAlert } = useAlert()
</script>

<style scoped>
.wrapper {
    width: 100%;
    padding: 1rem;
    position: fixed;
    top: 0;
}
</style>