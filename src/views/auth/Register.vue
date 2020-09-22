<template>
  <div id="register_wrapper">
    <div class="wrapper">
      <div class="block-center wd-xl">
        <div class="panel panel-dark panel-flat">
          <!-- <div class="panel-heading text-center">
            <a href="/">
              <img src="/images/logo.png" alt="Image" class="block-center img-rounded">
            </a>
          </div> -->
          <div class="panel-body register-form">
            <p class="text-center pv">{{'SIGNUP TO GET INSTANT ACCESS'}} </p>

            <el-form :model="user" ref="registerForm" label-width="120px" :rules="rules" label-position="top">
              <el-upload
                class="avatar-uploader-wrapper"
                :show-file-list="false"
                action="none"
                ref="upload"
                :auto-upload="false"
                :on-change="handleAvatarChange"
                :on-remove="handleAvatarRemove"
                :multiple="false"
                accept=".jpg, .png">
                  <div class="avatar-uploader__image-wrapper">
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      class="avatar-uploader__image">
                    <img
                      v-else
                      :src="'images/no-avatar.png'"
                      class="avatar-uploader__image">
                  </div>
              </el-upload>
              <el-form-item :label="'First Name'" prop="firstName">
                <el-input v-model="user.firstName"></el-input>
              </el-form-item>
              <el-form-item :label="'Last Name'" prop="lastName">
                <el-input v-model="user.lastName"></el-input>
              </el-form-item>
              <!-- <el-form-item :label="'Select country'" prop="country">
                <el-select v-model="user.country" filterable :placeholder="'Select One'" value-key="name" style="width: 100%;">
                  <el-option v-for="item in countryItems" :key="item.name" :label="item.name" :value="item">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item :label="'Email'" prop="email">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <!-- <el-form-item :label="'Mobile Number'" prop="mobileNumber">
                <el-input v-model="user.mobileNumber"></el-input>
              </el-form-item> -->
              <el-form-item :label="'Password'" prop="password" class="password_input">
                <el-input type="password" v-model="user.password"></el-input>
              </el-form-item>
              <el-form-item :label="'Confirm password'" prop="rePassword" class="password_input">
                <el-input type="password" v-model="user.rePassword"></el-input>
              </el-form-item>
              <button id="login" type="button" class="btn btn-block btn-primary mt-lg" v-on:click='register'>
                {{'Create Account'}}
              </button>
            </el-form>
            <!-- <p class="pt-lg text-center">{{'Need to Sign in?'}}</p> -->
            <router-link to="login" class="btn btn-block btn-default">{{'Sign In'}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from '@/router';
// import IoTService from '@/services/IoTService';
// import { selectValidator, emailValidator } from "@/utilities/utils";
import { Upload } from 'element-ui'

export default {
  name: "register_wrapper",
  data() {
    return {
      rules: {},
      countryItems: [],
      user: {
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        mobileNumber: "",
        password: "",
        rePassword: "",
        avatar: "/assets/pimg/no-avatar.png"
      },
      avatarData: null
    };
  },
  components: {
    'el-upload': Upload
  },
  methods: {
    ...mapActions("session", ["authenticate"]),
    async handleAvatarChange (file, fileList) {
      if (file.size > 2000000) {
        return this.$message.error({ type: 'error', message: 'File size may not exceed 2MB' })
      }
      this.$refs.upload.uploadFiles = [file]
      var url = URL.createObjectURL(file.raw);
      if (url)
        this.user.avatar = url;
      this.avatarData = file.raw;
    },
    handleAvatarRemove () {
      this.$refs.upload.clearFiles()
      // this.setUserAvatar(null)
      // this.setUserAvatarRaw(null)
    },
    register: async function(event) {
      router.push({ name: 'worker' });

      // this.$refs["registerForm"].validate(async valid => {
      //   if (!valid) {
      //     return false;
      //   }
      //   try {
      //     const create_user = new FormData();
      //     create_user.append('first_name', this.user.firstName);
      //     create_user.append('last_name', this.user.lastName);
      //     create_user.append('email', this.user.email);
      //     create_user.append('password', this.user.password);
      //     if (this.avatarData)
      //       create_user.append('avatar', this.avatarData);

      //     let result = await IoTService.signUp(create_user)
      //     if (result.data.success) {
      //       this.$message("The user have been registered successfully");
      //       localStorage.setItem("auth_token", result.data.token);
      //       router.push({ name: 'editor-view' });
      //     }
      //     else {
      //       this.$message.error(result.data.message);
      //     }
      //   } catch (error) {
      //     this.$message.error(error);
      //   }
      // });
    },
    init: function() {
      let validatePass = (rule, value, callback) => {
        let rgx = new RegExp(
          "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
        ).test(value);
        if (value === "") {
          callback(new Error('Enter password'));
        } else if (!rgx) {
          callback(new Error('You must enter at least six characters, at least one number and a special character.'));
        } else {
          callback();
        }
      };

      let validateRePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error('Enter password'));
        } else if (value !== this.user.password) {
          callback(new Error('Passwords do not match'));
        } else {
          callback();
        }
      };

      this.rules = {
        firstName: [
          {
            required: true,
            message: 'Enter First Name',
            trigger: "blur"
          }
        ],
        lastName: [
          {
            required: true,
            message: 'Enter Last Name',
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            emptyMessage: 'Enter email',
            formatMessage: 'The format of the email is not valid',
            trigger: "blur",
            // validator: emailValidator
          }
        ],
        // country: [
        //   {
        //     required: true,
        //     // validator: selectValidator,
        //     trigger: "change",
        //     message: 'Select country'
        //   }
        // ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        // mobileNumber: [
        //   {
        //     required: true,
        //     message: 'Enter Mobile Number',
        //     trigger: "blur"
        //   }
        // ],
        rePassword: [
          {
            required: true,
            validator: validateRePass,
            trigger: "blur"
          }
        ]
      };
    }
  },
  created: function() {
    this.init();
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

#register_wrapper {
  padding-top: calc((100vh - 798px) / 2);
}
.register-form .el-form-item__label {
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
}
.register-form .el-form-item {
  margin-bottom: 15px;
}
button#login {
  padding-top: 10px;
  margin-bottom: 10px;
}
.avatar-uploader-wrapper {
  text-align: center;
  margin: 15px 0;
}
.avatar-uploader__image-wrapper img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.el-upload__input {
  display: none !important;
}
.password_input {
  margin-bottom: 25px !important;
}
</style>
