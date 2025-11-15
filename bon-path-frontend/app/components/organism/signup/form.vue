<template>
    <v-form 
        v-model="modelForm"
        class="wrapper" 
        @submit.prevent="onSignupEvent(form)"
    >
        <v-text-field
            v-model="form.email"
            type="email"
            :label="$t('signUp.form.email')"
            :rules="rules.email"
        />
        <v-text-field 
            v-model="form.password"
            type="password"
            :label="$t('signUp.form.password')" 
            :rules="rules.password"
        />
        <v-btn 
            type="submit"
            color="primary"
            :loading="isLoading"
            :disabled="!modelForm"
        >
            {{ $t("signUp.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
const { form, rules, isLoading, onSignupEvent } = useSignupViewModel()
const modelForm = ref(false)

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>