<template>
    <article>
        <AtomTypography>
            {{ $t("emailVerify.successMsgArticle.heading") }}
        </AtomTypography>
        <AtomTypography>
            {{  $t("emailVerify.successMsgArticle.annotation") }}
        </AtomTypography>
        <v-btn>
            {{ $t("emailVerify.successMsgArticle.toDashBoardBtn") }}
        </v-btn>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>