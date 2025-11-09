<template>
    <v-form class="wrapper">
        <v-text-field :label="$t('signIn.form.name')" />
        <v-text-field :label="$t('signIn.form.email')" />
        <v-text-field :label="$t('signIn.form.password')" />
        <v-btn color="primary">{{ $t('signIn.form.onSubmitBtn') }}</v-btn>
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