<template>
    <article>
        <AtomTypography class="success-message">
            {{ $t("emailVerify.successMsgArticle.heading") }}
        </AtomTypography>
        <AtomTypography>
            {{  $t("emailVerify.successMsgArticle.annotation") }}
        </AtomTypography>
        <v-btn color="primary">
            {{ $t("emailVerify.successMsgArticle.toDashBoardBtn") }}
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