<template>
  <v-app>
    <app-bar :onMobile="onMobile" />
    <v-main>
      <router-view />
    </v-main>
    <footer-bar :onMobile="onMobile" />
  </v-app>
</template>

<script>
import AppBar from './components/app-bar.vue'
import FooterBar from './components/footer-bar.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    FooterBar,
  },
  computed: {
    onMobile() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    },
  },
  data: () => ({
    //
  }),
}
</script>
