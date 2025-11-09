<template>
    <v-form class="wrapper">
        <v-text-field :label="$t('signUp.form.email')" />
        <v-text-field :label="$t('signUp.form.password')" />
        <v-btn color="primary">
            {{ $t("signUp.form.onSubmitBtn") }}
        </v-btn>
    </v-form>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}
</style>