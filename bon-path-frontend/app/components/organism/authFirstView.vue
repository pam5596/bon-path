<template>
    <div class="wrapper">
        <AtomAppSymbol />
        <AtomTypography class="app-name">
            {{ $t("app-name") }}
        </AtomTypography>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.wrapper {
    max-width: 16rem;
}

.app-name {
    font-size: 3rem;
    text-align: center;
    color: white;
}
</style>