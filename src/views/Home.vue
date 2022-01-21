<template>
  <v-container id="index" class="d-flex justify-center align-center">
    <div>
      <v-avatar :size="`${onMobile ? 256 : 384}`">
        <v-img :src="require('../assets/me.jpeg')" />
      </v-avatar>
      <div class="typewriter text-center">
        <p>Hello World!</p>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="sass" >
#index
  height: calc(100vh - 56px)
</style>