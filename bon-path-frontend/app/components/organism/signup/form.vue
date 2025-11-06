<template>
    <v-form>
        <v-text-field :label="$t('signUp.form.email')" />
        <v-text-field :label="$t('signUp.form.password')" />
        <v-btn>
            {{ $t("signUp.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>