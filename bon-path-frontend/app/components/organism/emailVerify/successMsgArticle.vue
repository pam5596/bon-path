<template>
    <article>
        <AtomTypography class="success-message">
            {{ $t("emailVerify.successMsgArticle.heading") }}
        </AtomTypography>
        <AtomTypography>
            {{ $t("emailVerify.successMsgArticle.annotation") }}
        </AtomTypography>
        <v-btn color="primary" @click="toSignupEvent">
            {{ $t("emailVerify.successMsgArticle.toSignUpBtn") }}
        </v-btn>
    </article>
</template>

<script setup lang="ts">
const { toSignupEvent } = useEmailVerifyViewModel()

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