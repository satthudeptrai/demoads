<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
    <div class="loginForm">
      <div class="item-speak">
        <img src="@/icon/svg/speak2.svg" alt="">
      </div>
      <div class="item-cloud">
        <img src="@/icon/svg/clouds.svg" alt="">
      </div>
      <div>
        <img class="home-icon" src="@/icon/svg/home1.svg" alt="">
      </div>
      <div class="color-6 content">
        <div class="f-24">
          <b>Chào mừng bạn tới Botads,</b>
        </div>
        <div class="item2">
          Hãy đăng nhập bằng Facebook của bạn
        </div>
      </div>
      <button class="btn-login" @click="login()">
        <div>
          <i class="fab fa-facebook-f mr-11" style="font-size: 19.17px"></i>
        </div>
        <div class="f-16">
          Tiếp tục với Facebook
        </div>
      </button>
      <div class="f-12 color-2 signature">© Botup, Inc. All right reserved</div>
    </div>
  </div>
</template>

<script>
import UserInfoResource from '@/api/userInfo';
const userInfoApi = new UserInfoResource();
export default {
  name: 'login',
  methods: {
    login () {
      window.FB.login(response => {
        console.log('check login')
        console.log(response)
        if (response.status == 'connected') {
          userInfoApi.getUserInfo({ fb_access_token: response.authResponse.accessToken })
          .then(reps => {
            if(reps.code == 200) {
              this.$router.push({ name: 'home' })
              console.log(reps)
              this.$store.dispatch('setToken', reps.data.access_token)
            }
          })
          .catch(() => {})
          .finally(() => {
            this.formIsCreating = false;
          });
        }
      })
    }
  }
}
</script>

<style>
.loginForm {
  position: relative;
  width: 428px;
  height: 295px;
  background: #F55600;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.loginForm .item-speak {
  position: absolute;
  bottom: -32px;
  left: -32px;
}
.loginForm .item-cloud {
  position: absolute;
  top: -28.5px;
  right: -39.5px;
}
.loginForm .home-icon {
  margin: 32px 0 22px 32px !important;
}
.loginForm .btn-login {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  width: 368px !important;
  height: 40px !important;
  color: #F55600 !important;
  background: #FFFFFF;
  border-radius: 32px !important;
  margin: auto !important;
  border: none !important;
  margin-top: 10px !important;
}
.loginForm .btn-login:focus {
  outline: none !important;
}
.loginForm .content {
  height: 99px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  margin-left: 30px !important;
}
.loginForm .content .item2{
  font-size: 16px !important;
}
.loginForm .content div{
  line-height: 202% !important;
}
.signature {
  position: absolute;
  bottom: -34px;
  left: 134px;
}
@media screen and (max-width: 560px) {
  .loginForm {
    width: 326px;
    height: 378px;
  }
  .loginForm .item-cloud {
    right: -17px;
  }
  .loginForm .item-speak {
    left: -20px;
  }
  .loginForm .home-icon {
    margin: 74px 0 22px 32px !important;
  }
  .loginForm .content {
    height: auto !important;
    width: 276px !important;
    justify-content: center !important;
  }
  .loginForm .content .item2{
    font-size: 14px !important;
    margin-top: 30px;
  }
  .loginForm .content div{
    line-height: 150% !important;
  }
  .loginForm .btn-login {
    width: 266px !important;
    margin-top: 30px !important;
  }
  .signature {
    bottom: -197px;
    left: 83px;
  }
}
</style>
