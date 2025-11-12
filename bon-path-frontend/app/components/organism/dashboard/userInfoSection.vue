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

</script>

<style lang="scss" scoped>

</style>