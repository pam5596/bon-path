<template>
    <NuxtLayout name="auth">
        <OrganismSigninForm />
        <v-btn>
            {{ $t("signIn.toSignUpBtn") }}
        </v-btn>
    </NuxtLayout>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>