<template>
  <v-footer id="footer-bar" class="flex-column pt-4" color="#00000000">
    <div id="footer-bar-external-links" class="d-flex justify-space-around align-center">
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
    <v-spacer />
    <p id="footer-bar-copyright" class="mb-0 mt-6 align-self-center">
      {{ `&copy; ${new Date().getFullYear()} Patrick Maul, All Rights Reserved.` }}
    </p>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterBar',
  props: {
    onMobile: Boolean,
  },
  computed: {
    githubLogoSrc() {
      return this.$vuetify.theme.dark
        ? require('../assets/GitHub-Mark-Light-120px-plus.png')
        : require('../assets/GitHub-Mark-120px-plus.png')
    },
  },
  data: () => ({
    logoSize: 48,
  }),
}
</script>

<style lang="sass" scoped>
#footer-bar-actions, #footer-bar-external-links
  width: 100%

  .link
    color: inherit
</style>