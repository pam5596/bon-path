<template>
    <NuxtLayout name="auth">
        <div class="container">
            <OrganismSignupForm />
            <v-btn color="secondary" @click="toSigninEvent">
                {{ $t("signUp.toSignInBtn") }}
            </v-btn>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { toSigninEvent } = useSignupViewModel()

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>