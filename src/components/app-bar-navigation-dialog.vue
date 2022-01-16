<template>
  <v-dialog v-if="onMobile" v-model="showNavigation" fullscreen persistent hide-overlay transition="dialog-bottom-transition">
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="toggleMenu">
        <v-icon> mdi-menu </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dense flat height="56" color="#00000000">
        <v-img :src="logoSrc" :max-height="logoSize" :max-width="logoSize" @click="$router.push('/')" />
        <v-spacer />
        <v-btn icon @click="toggleMenu">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <div class="mx-4 mt-2">
        <nav>
          <v-btn
            v-for="nav_item in links"
            :key="nav_item.id"
            class="my-2"
            :to="nav_item.link"
            block
            text
            tile
            @click="toggleMenu"
          >
            {{ nav_item.label }}
          </v-btn>
        </nav>

        <div id="mobile-navigation-footer" class="mb-4 mx-4">
          <div id="settings" class="mb-2">
            <v-btn block text tile @click="$vuetify.theme.dark = !$vuetify.theme.dark">
              <v-icon left>
                {{ $vuetify.theme.dark ? 'mdi-brightness-5' : 'mdi-brightness-3' }}
              </v-icon>
              Change theme
            </v-btn>
          </div>
          <div id="extern" class="d-flex justify-space-around align-center">
            <a href="https://github.com/PatrickMaul" target="__blank">
              <v-img :src="githubLogoSrc" :max-height="logoSize" :max-width="logoSize" />
            </a>
            <a href="https://www.npmjs.com/~patrickmaul" target="__blank">
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
                :max-height="logoSize"
                :max-width="logoSize"
              />
            </a>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppBarNavigationDialog',
  props: {
    onMobile: Boolean,
    showNavigation: Boolean,
    logoSize: Number,
    links: Array,
    logoSrc: String,
  },
  computed: {
    githubLogoSrc() {
      return this.$vuetify.theme.dark
        ? require('../assets/GitHub-Mark-Light-120px-plus.png')
        : require('../assets/GitHub-Mark-120px-plus.png')
    },
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu')
    },
  },
}
</script>

<style lang="sass" scoped>
#mobile-navigation-footer
  position: absolute
  right: 0
  bottom: 0
  left: 0
</style>