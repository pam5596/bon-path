<template>
    <v-form 
        v-model="modelForm"
        class="wrapper" 
        @submit.prevent="onSigninEvent(form)"
    >
        <v-text-field 
            v-model="form.name"
            :label="$t('signIn.form.name')"
            :rules="rules.name"
        />
        <v-text-field 
            v-model="form.email"
            type="email"
            :label="$t('signIn.form.email')"
            :rules="rules.email"
        />
        <v-text-field 
            v-model="form.password"
            type="password"
            :label="$t('signIn.form.password')" 
            :rules="rules.password"
        />
        <v-btn 
            type="submit"
            color="secondary"
            :loading="isLoading"
            :disabled="!modelForm"
        >
            {{ $t('signIn.form.onSubmitBtn') }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">
const { form, rules, isLoading, onSigninEvent } = useSigninViewModel()
const modelForm = ref(false)

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>