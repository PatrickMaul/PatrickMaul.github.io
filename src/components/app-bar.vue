<template>
  <v-app-bar id="app-bar" app dense flat :hide-on-scroll="onMobile" height="56" color="#00000000">
    <v-img class="pointable" :src="logoSrc" :max-height="logoSize" :max-width="logoSize" @click="$router.push('/')" />

    <v-spacer />

    <app-bar-navigation-dialog
      :on-mobile="onMobile"
      :logo-size="logoSize"
      :show-navigation="showNavigation"
      :links="links"
      :logo-src="logoSrc"
      @toggleMenu="showNavigation = !showNavigation"
    />

    <!-- #region Desktop Navigation -->

    <v-btn v-if="!onMobile" icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon>
        {{ $vuetify.theme.dark ? 'mdi-brightness-5' : 'mdi-brightness-3' }}
      </v-icon>
    </v-btn>

    <template v-if="!onMobile" #extension>
      <div class="ma-auto">
        <v-btn v-for="nav_item in links" :key="nav_item.id" :to="nav_item.link" text tile>
          {{ nav_item.label }}
        </v-btn>
      </div>
    </template>
    <!-- #endregion -->
  </v-app-bar>
</template>

<script>
import appBarNavigationDialog from './app-bar-navigation-dialog.vue'

export default {
  name: 'AppBar',
  components: {
    appBarNavigationDialog,
  },
  props: {
    onMobile: Boolean,
  },
  computed: {
    logoSrc() {
      return this.$vuetify.theme.dark ? require('../assets/PM-White.svg') : require('../assets/PM-Black.svg')
    },
  },
  data: () => ({
    showNavigation: false,
    logoSize: 48,
    links: [
      {
        id: 0,
        label: 'Home',
        link: '/',
        outside: true,
      },
      {
        id: 1,
        label: 'About Me',
        link: '/about',
        outside: false,
      },
      {
        id: 2,
        label: 'My Projects',
        link: '/my-projects',
        outside: true,
      },
    ],
  }),
}
</script>

<style lang="sass" scoped>
#app-bar
  backdrop-filter: blur(2px)
</style>