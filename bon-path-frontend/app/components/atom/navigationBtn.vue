<template>
    <v-btn class="content">
        <v-icon
            size="30"
            class="icon"
        >{{ props.mdiIcon }}</v-icon>
        <span class="name">{{ props.name }}</span>
    </v-btn>
</template>

<script setup lang="ts">
import type { VIcon } from 'vuetify/components';

const props =  defineProps<{
    mdiIcon: string,
    name: string
}>()
</script>

<style scoped>
.content {
    padding: 0;
}

.icon {
    background: linear-gradient(90deg, #b1aaff, #8ec5fc);
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.name {
    color: rgb(159, 159, 159);
    font-weight: bold;
}


</style>