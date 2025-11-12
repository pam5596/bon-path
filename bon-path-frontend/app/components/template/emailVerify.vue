<template>
    <NuxtLayout name="auth">
        <component :is="articleComponent"/>
    </NuxtLayout>
</template>

<script setup lang="ts">
const { status, execute } = useEmailVerifyViewModel()
onMounted(async() => await execute())

const articleComponent = ref()
const successArticle = resolveComponent('OrganismEmailVerifySuccessMsgArticle')
const failedArticle = resolveComponent('OrganismEmailVerifyFailedMsgArticle')
watch(status, (status) => {
    articleComponent.value = status == 'success' ? successArticle : failedArticle
})

</script>

<style scoped>

</style>