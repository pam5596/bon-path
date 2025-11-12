<template>
    <article>
        <v-card class="wrapper">
            <v-card-title>
                {{ createdAt }}
            </v-card-title>
            <v-divider />
            <v-card-text>
                <OrganismReceiptRegisterCheckForm />
            </v-card-text>
        </v-card>
    </article>
</template>

<script setup lang="ts">
const { data } = useReceiptRegisterCheckViewModel()
const createdAt = computed(() => data.value?.receipt.getValues.createdAt?.toLocaleString())

</script>

<style scoped>
.wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>