<template>
    <section>
        <v-btn>次へ</v-btn>
        <v-dialog>
            <v-card>
                <v-card-title>
                    撮影したレシート
                </v-card-title>
                <v-card-text>
                    <v-avatar>
                        <v-img></v-img>
                    </v-avatar>
                    <v-avatar>
                        <v-img></v-img>
                    </v-avatar>
                    <v-avatar>
                        <v-img></v-img>
                    </v-avatar>
                </v-card-text>
                <v-card-actions>
                    <v-btn>登録する</v-btn>
                    <v-btn>キャンセル</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>