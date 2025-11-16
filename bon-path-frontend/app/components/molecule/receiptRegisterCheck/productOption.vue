<template>
    <v-list-item no-title>
        <v-chip 
            v-if="props.isKnown"
            class="chip"
            variant="flat"
            color="success"
            size="x-small"
        >
            {{ $t('receiptRegisterCheck.form.productOption.isKnownChip') }}
        </v-chip>
        <v-avatar class="avatar" size="100">
            <v-img 
                :src="props.src"
            />
        </v-avatar>
        <template #title>
            <span />
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{
    src?: string
    isKnown: boolean
}>()
</script>

<style scoped>
.avatar {
    border-radius: 0;
    position: relative;
}

.chip {
    position: absolute;
    bottom: 0.25rem;
    right: 0.25rem;
    z-index: 5;
}
</style>