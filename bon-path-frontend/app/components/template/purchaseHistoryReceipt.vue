<template>
    <main>
        <!-- <p>{{ $route.params }}</p> -->
        <v-parallax></v-parallax>
        <article>
            <v-card>
                <v-card-title>
                    店名
                </v-card-title>
                <v-card-subtitle>
                    2025/10/28 Fri. 10:00-
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <div>
                        <div>
                            <v-avatar></v-avatar>
                            <p>商品名</p>
                            <p>100円</p>
                            <p>×2</p>
                        </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <p>合計</p>
                    <p>400円</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn>削除</v-btn>
                </v-card-actions>
            </v-card>
        </article>
        <!-- [organism]ここにbottom-navigation -->
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>