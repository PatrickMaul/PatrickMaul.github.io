<template>
  <v-app>
    <app-bar :onMobile="onMobile" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import appBar from './components/app-bar.vue'
export default {
  name: 'App',
  components: {
    appBar,
  },
  computed: {
    onMobile() {
      this.setStoreVariable()
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    },
  },
  data: () => ({
    //
  }),
  methods: {
    setStoreVariable() {
      this.$store.commit('set', this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
    },
  },
}
</script>
