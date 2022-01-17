<template>
  <v-container id="index" class="py-0">
    <div class="index d-flex flex-column justify-center align-center">
      <v-avatar :size="`${onMobile ? 256 : 384}`">
        <v-img :src="require('../assets/me.jpeg')" />
      </v-avatar>
      <div class="typewriter">
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
