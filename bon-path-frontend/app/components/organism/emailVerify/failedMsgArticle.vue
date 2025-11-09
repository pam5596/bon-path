<template>
    <article>
        <AtomTypography class="success-message">
            {{  $t("emailVerify.failedMsgArticle.heading") }}
        </AtomTypography>
        <AtomTypography>
            {{  $t("emailVerify.failedMsgArticle.annotation") }}
        </AtomTypography>
        <v-btn color="secondary">
            {{ $t("emailVerify.failedMsgArticle.toSignInBtn") }}
        </v-btn>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>
article {
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.success-message {
    font-size: 1.5rem;
}
</style>