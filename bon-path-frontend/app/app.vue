<template>
  <div>
    <v-app>
      <NuxtLayout>
        <NuxtLayout name="alert-dialog">
          <NuxtLayout name="loading-overlay">
            <NuxtPage />
          </NuxtLayout>
        </NuxtLayout>
      </NuxtLayout>
    </v-app>
  </div>
</template>
