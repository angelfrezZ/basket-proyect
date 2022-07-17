<template>
  <v-container>
    <v-app>
      <v-main>
        <variedadesPage v-if="!$route.meta.hideNavbar" />
        <router-view />
      </v-main>
    </v-app>
  </v-container>
</template>

<script>
import variedadesPage from "@/components/variedadesPage.vue"
export default {
  name: 'App',
  components: {
    variedadesPage
  },
  data: () => ({
    //
  }),
};
</script>
