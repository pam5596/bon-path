<template>
    <section>
        <AtomTypography>
            {{ data?.user.getValues.name }}
        </AtomTypography>
        <AtomTypography>
            {{ data?.user.getValues.email }}
        </AtomTypography>
    </section>
</template>

<script setup>
const { data } = useDashboardViewModel()
watch(data, (data) => console.log(data.user.getValues.createdAt))

</script>

<style lang="scss" scoped>

</style>