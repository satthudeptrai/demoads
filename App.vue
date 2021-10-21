<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted () {
    this.isMobile()
  },
  methods: {
    isMobile () {
      if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
        this.$store.dispatch('setIsMobile', true)
      }
    }
  }
}
</script>

<style></style>
