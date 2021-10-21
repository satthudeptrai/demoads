<template>
  <div>
    <div v-if="isMobile">
      <mobile />
    </div>
    <div v-if="!isMobile">
      <destop />
    </div>
  </div>
</template>

<script>
import mobile from './mobile/index'
import destop from './destop/index'
export default {
  name: 'home',
  computed: {
    isMobile () {
      return this.$store.getters.isMobile
    }
  },
  components: { mobile, destop },
  methods: {
    checkLogin () {
      const _self = this;
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');

      window.fbAsyncInit = async function() {
        FB.init({
          appId: '432754284533785',
          cookie: true,
          status: true,
          xfbml: true,
          version: 'v1.0'
        });

        FB.AppEvents.logPageView();
        FB.getLoginStatus(response => {
          console.log(response);
          if (response.status !== 'connected') {
            _self.$router.push({ name: 'login' })
          }
        }, true)
      };
    }
  },
  mounted () {

  },
  created () {
    // this.checkLogin()
  }
};
</script>

<style></style>
