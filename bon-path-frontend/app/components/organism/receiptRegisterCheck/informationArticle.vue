<template>
    <article>
        <v-card>
            <v-card-title>
                {{ new Date().toLocaleString() }}
            </v-card-title>
            <v-card-text>
                <OrganismReceiptRegisterCheckForm />
            </v-card-text>
        </v-card>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>