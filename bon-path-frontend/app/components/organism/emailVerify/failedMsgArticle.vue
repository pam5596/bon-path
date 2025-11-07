<template>
    <article>
        <AtomTypography>
            {{  $t("emailVerify.failedMsgArticle.heading") }}
        </AtomTypography>
        <AtomTypography>
            {{  $t("emailVerify.failedMsgArticle.annotation") }}
        </AtomTypography>
        <v-btn>
            {{ $t("emailVerify.failedMsgArticle.toSignInBtn") }}
        </v-btn>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>