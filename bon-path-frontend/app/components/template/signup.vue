<template>
    <NuxtLayout name="auth">
        <OrganismSignupForm />
        <v-btn>
            {{ $t("signUp.toSignInBtn") }}
        </v-btn>
    </NuxtLayout>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>