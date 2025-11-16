<template>
    <section>
        <AtomTypography>
            {{ createdAt }}
        </AtomTypography>
        <v-btn
            class="help-btn"
            color="primary"
            variant="tonal"
            size="x-small"
            icon="mdi-help"
            @click="openDialog"
        />
        <MoleculeReceiptRegisterCheckHelpDialog 
            v-model="modelDialog"
        />
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    createdAt?: Date
}>()
const createdAt = computed(() => props.createdAt?.toLocaleString())

const modelDialog = ref(false)
const openDialog = () => {modelDialog.value = true}

</script>

<style scoped>
section {
    display: flex;
}

.help-btn {
    margin-left: auto;
}
</style>