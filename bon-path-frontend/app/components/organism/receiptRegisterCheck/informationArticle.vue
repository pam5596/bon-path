<template>
    <article>
        <v-card>
            <v-card-title>
                2025/10/28 Fri. 10:00
            </v-card-title>
            <v-card-text>
                <v-form>
                    <MoleculeReceiptRegisterCheckStoreSelector />
                    <v-divider></v-divider>
                    <div>
                        <h2>商品一覧</h2>
                        <v-list>
                            <MoleculeReceiptRegisterCheckProductListItem />
                            <MoleculeReceiptRegisterCheckProductListItem />
                            <MoleculeReceiptRegisterCheckProductListItem />
                        </v-list>
                    </div>
                    <v-btn>登録する</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </article>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>