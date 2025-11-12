<template>
    <NuxtLayout name="auth">
        <div class="container">
            <OrganismSigninForm />
            <v-btn color="primary" @click="toSignupEvent">
                {{ $t("signIn.toSignUpBtn") }}
            </v-btn>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { toSignupEvent } = useSigninViewModel()

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>