<template>
    <section>
        <AtomTypography>
            {{ user.name }}
        </AtomTypography>
        <AtomTypography>
            {{ user.email }}
        </AtomTypography>
    </section>
</template>

<script setup>
const { usersFixture } = useFixtures()
const user = ref(usersFixture[0])

</script>

<style lang="scss" scoped>

</style>