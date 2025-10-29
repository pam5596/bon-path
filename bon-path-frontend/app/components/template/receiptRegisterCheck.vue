<template>
    <main>
        <v-parallax></v-parallax>
        <article>
            <v-card>
                <v-card-title>
                    2025/10/28 Fri. 10:00
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <div>
                            <h2>店舗</h2>
                            <v-avatar></v-avatar>
                            <v-autocomplete></v-autocomplete>
                        </div>
                        <v-divider></v-divider>
                        <div>
                            <h2>商品一覧</h2>
                            <div>
                                <div>
                                    <v-avatar></v-avatar>
                                    <v-autocomplete></v-autocomplete>
                                    <p>100円</p>
                                    <p>×1</p>
                                </div>
                            </div>
                        </div>
                        <v-btn>登録する</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </article>
        <!-- [organism]ここにbottom-navigation -->
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>