<template>
  <div id="login_wrapper">
    <div class="wrapper">
      <div class="block-center wd-xl">
        <div class="panel panel-dark panel-flat">
          <!-- <div class="panel-heading text-center">
            <a href="/">
              <img src="/images/logo.png" alt="Image" class="block-center img-rounded">
            </a>
          </div> -->
          <div class="panel-body login-form">
            <p class="text-center pv">{{'SIGN IN TO CONTINUE'}}</p>

            <el-form :model="user" ref="loginForm" label-width="120px" :rules="rules" label-position="top">
              <el-form-item :label="'Email'" prop="email">
                <el-input v-model.trim="user.email" @keyup.enter.native="login" autofocus></el-input>
              </el-form-item>
              <el-form-item :label="'Password'" prop="password">
                <el-input icon="secret" type="password" v-model.trim="user.password" required @keyup.enter.native="login"></el-input>
              </el-form-item>

              <!-- <div class="row">
                <div class="col-xs-5">
                  <el-checkbox v-model="user.rememberme">{{'Keep me Login'}}</el-checkbox>
                </div>
                <div class="col-xs-7 text-right forgot-password">
                  <router-link :to="{'name' :'forgot_password'}">{{'Forgot you password?'}}</router-link>
                </div>
              </div> -->
              <button id="login" type="button" class="btn btn-block btn-primary mt-lg" v-on:click='login'>{{'Login'}}
              </button>
            </el-form>
            <!-- <p class="pt-lg text-center">{{'Not registered yet?'}}</p> -->
            <router-link to="/register" class="btn btn-block btn-default">{{'Register Now'}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import bypassAuthRoute from "./bypassAuthRoute";
import { mapActions } from "vuex";
import router from '@/router';
// import IoTService from '@/services/IoTService';

export default {
  name: "login_wrapper",
  data() {
    return {
      rules: {},
      user: { email: "", password: "", rememberme: false },
      retx: "",
      initAuth: "",
      newAuth: "",
      ishmar: true,
      newAuthUser: "",
      user_uuid: "",
      dev_token: "",
      hint: false,
      hint1: false,
      allDevelopers: "",
      checked: false,
      isRequestActive: false
    };
  },

  updated: function() {},
  created: function() {
    this.init();
    this.initFunction();
  },
  methods: {
    ...mapActions("session", ["authenticate"]),
    initFunction: async function() {},

    login: async function(event) {
      router.push({ name: 'worker' });
      // this.isRequestActive = true;
      // this.$refs["loginForm"].validate(async valid => {
      //   if (!valid) {
      //     return false;
      //   }
      //   try {
      //     let result = await IoTService.signIn({
      //       email: this.user.email,
      //       password: this.user.password
      //     })
      //     if (result.data.success) {
      //       localStorage.setItem("auth_token", result.data.token);
      //       this.$message("Success to login");
      //       router.push({ name: 'editor-view' });
      //     }
      //     else {
      //       this.$message.error(result.data.message);
      //     }
            
      //   } catch (e) {
      //     this.$message.error("Failed to login");
      //   }
      // });
    },
    init: function(){
      this.rules = {
        email: [
          {
            required: true,
            type: 'email',
            message: 'Enter email',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: 'Enter password',
            trigger: "blur"
          }
        ]
      };
    }
  }
};
</script>
<style>
/** app.css */
.wrapper {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100%;
}
.block-center {
    margin: 0 auto;
}
.wd-xl {
    width: 320px
}
.panel {
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.panel-body {
    padding: 15px;
}
.btn-default {
    color: #333;
    background-color: #f5f5f5;
    border-color: #d6d6d6;
}
/** */

#login_wrapper {
  padding-top: calc((100vh - 369px) / 2);
}
.login-form .el-checkbox__label,
.login-form .forgot-password {
  font-size: 12px;
  font-weight: normal;
}

.login-form .el-form-item__label {
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
}

.login-form .el-form-item {
  margin-bottom: 15px;
}

button#login {
  margin-bottom: 10px;
}
</style>
