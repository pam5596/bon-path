<template>
    <article>
        <h1>登録履歴</h1>
        <div>
            <!-- [molecule]ここにGoogleMap -->
        </div>
        <v-dialog>
            <v-card>
                <v-avatar>
                    <v-img></v-img>
                </v-avatar>
                <v-card-item>
                    <v-card-title>
                        店名
                    </v-card-title>
                    <v-card-subtitle>
                        ここで10回買い物をしました
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn>
                            ここでの履歴を見る
                        </v-btn>
                    </v-card-actions>
                </v-card-item>
            </v-card>
        </v-dialog>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>