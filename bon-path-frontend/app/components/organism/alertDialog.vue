<template>
    <div v-if="alertContent" class="wrapper">
        <v-alert
            class="alert"
            :type="alertContent.type"
            :title="alertContent.title"
            closable
            @click:close="onCloseAlert"
        >   
            <MoleculeAlertCaption 
                :content="alertContent.forDeveloper"
            />
            <template #text>
                <AtomTypography
                    v-for="(text, index) in texts"
                    :key="index"
                >
                    {{ text }}
                </AtomTypography>
            </template>
        </v-alert>
    </div>
</template>

<script setup lang="ts">
const { alertContent, onCloseAlert } = useAlert()
const texts = computed(() => 
    alertContent.value?.text?.split(',')
)

</script>

<style scoped>
.wrapper {
    width: 100%;
    padding: 1rem;
    position: fixed;
    top: 0;
}

.alert {
    padding: 0.5rem;
}
</style>