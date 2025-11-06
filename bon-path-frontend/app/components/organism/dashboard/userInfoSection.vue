<template>
    <section>
        <AtomTypography>
            {{ user.getValues.name }}
        </AtomTypography>
        <AtomTypography>
            {{ user.getValues.email }}
        </AtomTypography>
    </section>
</template>

<script setup>
const { usersFixture } = useFixtures()
const user = computed(()=>new UserModel(usersFixture[0]))

</script>

<style lang="scss" scoped>

</style>